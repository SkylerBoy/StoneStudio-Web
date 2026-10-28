// Web estática salvo el panel de Keystatic (/keystatic), que necesita funciones de
// servidor para hablar con GitHub. Por eso hay adaptador aunque el resto se prerenderice.
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    // Dominio provisional: cambiarlo cuando se compre el definitivo (lo usan el sitemap y las
    // etiquetas canonical/Open Graph).
    site: "https://bystonestudio.com",
    adapter: netlify(),
    integrations: [
        react(),
        markdoc(),
        keystatic(),
        sitemap({ filter: (url) => !url.includes("/keystatic") && !url.includes("/presupuesto/gracias") }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
});
