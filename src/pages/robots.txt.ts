/**
 * robots.txt generado en el build para que la línea del sitemap use el dominio y la subruta
 * reales (Netlify, dominio propio o vista previa de GitHub Pages) en vez de uno fijo.
 */
import type { APIRoute } from "astro";
import { ruta } from "../lib/rutas";

export const GET: APIRoute = ({ site }) => {
    const sitemap = new URL(ruta("/sitemap-index.xml"), site).href;
    return new Response(`User-agent: *\nDisallow: ${ruta("/keystatic")}\nDisallow: ${ruta("/api/")}\n\nSitemap: ${sitemap}\n`, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
};
