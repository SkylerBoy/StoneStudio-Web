// Dos formas de publicar la misma web:
//
// - Netlify (la normal): estática salvo el panel de Keystatic (/keystatic), que necesita
//   funciones de servidor para hablar con GitHub. Por eso hay adaptador.
// - Vista previa en GitHub Pages (PUBLIC_VISTA_PREVIA=true): Pages solo sirve archivos, así
//   que va sin adaptador ni panel, bajo la subruta del repositorio. El formulario se
//   desactiva y las páginas llevan noindex (ver src/lib/rutas.ts).
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const vistaPrevia = process.env.PUBLIC_VISTA_PREVIA === "true";

const comun = {
    integrations: [
        react(),
        markdoc(),
        sitemap({ filter: (url) => !url.includes("/keystatic") && !url.includes("/presupuesto/gracias") }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
};

export default defineConfig(
    vistaPrevia
        ? {
              ...comun,
              site: "https://skylerboy.github.io",
              base: "/StoneStudio-Web",
          }
        : {
              ...comun,
              // Dominio provisional: cambiarlo cuando se compre el definitivo (lo usan el
              // sitemap y las etiquetas canonical/Open Graph).
              site: "https://bystonestudio.com",
              adapter: netlify(),
              integrations: [...comun.integrations, keystatic()],
          },
);
