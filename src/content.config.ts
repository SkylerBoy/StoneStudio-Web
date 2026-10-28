/**
 * Colecciones de Astro. Solo los proyectos pasan por aquí: llevan fotos y image() es lo
 * que permite optimizarlas. El esquema replica el de keystatic.config.ts; si se añade un
 * campo allí, hay que añadirlo también aquí o Astro lo descarta.
 */
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const proyectos = defineCollection({
    loader: glob({ pattern: "**/*.mdoc", base: "./src/content/proyectos" }),
    schema: ({ image }) =>
        z.object({
            titulo: z.string(),
            categoria: z.enum(["marcas", "eventos"]),
            cliente: z.string().optional(),
            lugar: z.string().optional(),
            fecha: z.coerce.date(),
            resumen: z.string(),
            destacado: z.boolean().default(false),
            portada: image(),
            portadaAlt: z.string(),
            galeria: z.array(z.object({ imagen: image(), alt: z.string() })).default([]),
        }),
});

export const collections = { proyectos };
