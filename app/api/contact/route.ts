import { NextResponse } from "next/server";
import { needs } from "@/lib/content";
import { site } from "@/lib/site";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM)
    return NextResponse.json(
      { error: "Envoi non configuré. Utilisez le lien e-mail direct." },
      { status: 503 },
    );
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return NextResponse.json(
      { error: "Origine non autorisée." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return NextResponse.json({ error: "Format invalide." }, { status: 415 });
  const raw = await request.text();
  if (raw.length > 12000)
    return NextResponse.json({ error: "Message trop long." }, { status: 413 });
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data))
      throw new Error();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  if (data.company_url)
    return NextResponse.json({ error: "Requête refusée." }, { status: 400 });
  const str = (key: string) =>
    typeof data[key] === "string" ? (data[key] as string).trim() : "";
  const name = str("name"),
    email = str("email"),
    need = str("need"),
    budget = str("budget"),
    message = str("message");
  if (
    !name ||
    name.length > 100 ||
    email.length > 200 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    /[\r\n]/.test(email) ||
    !needs.includes(need) ||
    message.length < 20 ||
    message.length > 4000 ||
    budget.length > 100
  )
    return NextResponse.json(
      {
        error:
          "Vérifiez vos coordonnées et décrivez votre projet en au moins 20 caractères.",
      },
      { status: 400 },
    );
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [process.env.CONTACT_TO || site.email],
        reply_to: email,
        subject: `Projet Dicode · ${need}`,
        text: `Nom : ${name}\nE-mail : ${email}\nBesoin : ${need}\nBudget : ${budget}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Delivery failed");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "L’envoi a échoué. Réessayez ou utilisez l’adresse e-mail directe.",
      },
      { status: 502 },
    );
  }
}
