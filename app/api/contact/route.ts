import { NextResponse } from "next/server";
import { needs } from "@/lib/content";
import { site } from "@/lib/site";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const endpoint = process.env.FORMSPREE_ENDPOINT?.trim();

  if (
    !endpoint ||
    !/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)
  )
    return NextResponse.json(
      { error: "Envoi non configuré. Utilisez le lien e-mail direct." },
      { status: 503 },
    );

  const origin = new URL(request.url).origin;
  if (request.headers.get("origin") !== origin)
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
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Referer: `${origin}/contact`,
      },
      body: JSON.stringify({
        name,
        email,
        need,
        budget,
        message,
        subject: `Projet Dicode · ${need}`,
      }),
      redirect: "error",
      signal: AbortSignal.timeout(10000),
    });

    if (response.status === 429)
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez plus tard." },
        { status: 429 },
      );

    if (!response.ok) {
      console.error("Formspree HTTP error:", response.status);
      throw new Error("Formspree request failed");
    }

    const result: unknown = await response.json();

    if (
      !result ||
      typeof result !== "object" ||
      Array.isArray(result) ||
      "error" in result ||
      "errors" in result ||
      !("next" in result) ||
      typeof result.next !== "string"
    ) {
      throw new Error("Unconfirmed Formspree submission");
    }

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
