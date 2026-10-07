import assert from "node:assert/strict";
import { readFile as readBuiltFile, access } from "node:fs/promises";
import { existsSync } from "node:fs";
// The hosted Site exports out/; the downloadable source keeps Next.js server output.
async function readFile(file, encoding) {
  let target = file;
  if (file.startsWith("out/") && !existsSync("out/index.html")) {
    const route = file.slice(4);
    target = ".next/server/app/" + (route === "sitemap.xml" ? "sitemap.xml.body" : route.replace(/\/(index\.html)$/, ".html"));
  }
  const content = await readBuiltFile(target, encoding);
  // Next.js server builds encode local image paths inside optimisation URLs.
  return typeof content === "string" ? content.replaceAll("%2F", "/") : content;
}
const slugs = ["dicode-portfolio", "rynva", "mefolio", "quebec-signature", "lexpo", "gozem", "post"];
const home = await readFile("out/index.html", "utf8");
for (const slug of slugs) {
  assert.ok(home.includes(`/projets/${slug}`), `Accueil : lien ${slug}`);
  const html = await readFile(`out/projets/${slug}/index.html`, "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${slug} : un H1`);
  assert.ok(html.includes('name="description"'), `${slug} : description`);
  assert.ok(html.includes('rel="canonical"'), `${slug} : canonical`);
  for (const m of html.matchAll(/<img\b[^>]*src="(\/images\/[^"?]+)"/g))
    await access("public" + m[1]);
}
const expo = await readFile("out/projets/lexpo/index.html", "utf8");
const gozem = await readFile("out/projets/gozem/index.html", "utf8");
assert.ok(expo.includes("https://lexpo-gallery.vercel.app/"));
assert.ok(gozem.includes("https://rolnelh.github.io/gozem-refonte/"));
assert.ok(gozem.includes("Refonte indépendante"));
assert.ok(!gozem.includes("Découvrir MeFolio"));
assert.ok(!expo.includes("Découvrir MeFolio"));
const sitemap = await readFile("out/sitemap.xml", "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, 13);
for (const slug of slugs) assert.ok(sitemap.includes(`/projets/${slug}`));
console.log("7 projets, 7 fiches, images et liens, 13 URL sitemap vérifiés.");
const mefolio = await readFile("out/projets/mefolio/index.html", "utf8");
assert.ok(mefolio.includes("/images/mefolio-dashboard.png"));
const quebec = await readFile(
  "out/projets/quebec-signature/index.html",
  "utf8",
);
for (const name of ["hero", "equipment", "footer"])
  assert.ok(quebec.includes(`/images/quebec-signature-${name}.png`));

const rynva = await readFile("out/projets/rynva/index.html", "utf8");
assert.ok(rynva.includes("https://rynva.app/dashboard"));
assert.ok(rynva.includes("/images/rynva-dashboard-full.png"));
assert.ok(!home.includes("/projets/vidmake"));

assert.ok(expo.includes("/images/lexpo-page.jpg"));
assert.ok(expo.includes("layered-page-scene"));
assert.ok(mefolio.includes("photographic-mockup"));
assert.ok(rynva.includes("dashboard-mockup-rynva"));

assert.ok(rynva.includes("Voir la capture complète en grand"));

const portfolio = await readFile("out/projets/dicode-portfolio/index.html", "utf8");
assert.ok(portfolio.includes("portfolio-desktop-device"));
assert.ok(portfolio.includes("portfolio-phone-device"));
const preview = await readFile("out/apercu-portfolio/index.html", "utf8");
assert.ok(preview.includes("De votre idée au produit"));
assert.ok(!preview.includes("portfolio-device-scene"), "No recursive previews");
assert.ok(!sitemap.includes("/apercu-portfolio"), "Preview route not indexed");

assert.ok(quebec.includes("/images/quebec-original-hero.jpg"));
assert.ok(quebec.includes("/images/quebec-original-full.jpg"));
assert.ok(quebec.includes("https://demenagementquebecsignature.ca/"));
assert.ok(quebec.includes("Ce que j’ai repensé"));
assert.ok(quebec.includes("Ma proposition"));

for (const image of ["gozem-before-hero.jpg", "gozem-before-full.jpg", "gozem-after-hero.jpg", "gozem-after-full.jpg"]) {assert.ok(gozem.includes("/images/"+image));await access("public/images/"+image);}
assert.ok(gozem.includes("https://gozem.co/bj/fr/"));
assert.ok(gozem.includes("Ma refonte"));
assert.ok(!gozem.includes("/images/gozem.webp"));

assert.ok(mefolio.includes('/images/mefolio-pages-mosaic.png'));
assert.ok(portfolio.includes('/images/dicode-macbook-presentation.png'));
assert.ok(gozem.includes('/images/gozem-sections-mosaic.png'));
assert.ok(home.includes('/images/gozem-sections-mosaic.png'));
assert.ok(home.includes('/images/mefolio-dashboard.png'));
assert.ok(!home.includes('/images/mefolio-pages-mosaic.png'));
assert.ok(!home.includes('/images/dicode-macbook-presentation.png'));
assert.ok(gozem.includes('presentation-mosaic'));
assert.ok(gozem.includes('Mockup de présentation généré'));
assert.ok(mefolio.includes('Mockup de présentation généré'));
console.log('Approved mockups appear in the intended cards and detail pages; original case-study captures remain.');

const allowPending = process.argv.includes("--allow-pending");
const pendingDetails = [];
for (const slug of slugs) {
  const html=await readFile(`out/projets/${slug}/index.html`,'utf8');
  for(const required of ['craft-heading','Mon rôle','Choix de conception','Palette de couleurs']) assert.ok(html.includes(required),`${slug}: ${required}`);
  const pending=html.includes('__ROLE_PENDING__') || html.includes('__STACK_PENDING__');
  if(pending) pendingDetails.push(slug);
  assert.ok(allowPending || !pending, `${slug}: unresolved role/stack must never be published`);
}
console.log(pendingDetails.length ? `DRAFT ONLY: waiting for role/stack details in ${pendingDetails.join(', ')}. Publishing remains blocked.` : 'Seven exported project pages include resolved roles, design details and palettes.');
assert.ok(mefolio.includes('Voir la capture complète en grand'));
assert.ok(mefolio.includes('Voir le mockup en pleine résolution'));
assert.ok(portfolio.includes('Voir le mockup en pleine résolution'));
assert.ok(gozem.includes('Ouvrir le mockup en grand'));
console.log('Full-resolution presentation links and genuine screenshot links are visible in the project details.');
