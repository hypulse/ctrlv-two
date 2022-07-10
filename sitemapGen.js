const fs = require("fs");

const URL = "http://www.example.com";
const lastMod = new Date().toISOString();
const pages = ["/", "/ko", "/en"];
const urls = pages
  .map(
    (page) => `<url>
<loc>${URL + page}</loc>
<lastmod>${lastMod}</lastmod>
</url>`
  )
  .join("");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>${urls}</urlset>`;

fs.writeFileSync("./public/sitemap.xml", sitemap, "utf8");
