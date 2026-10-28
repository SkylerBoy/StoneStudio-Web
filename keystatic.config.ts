/**
 * Panel de contenido (/keystatic).
 *
 * Es lo que usa el estudio para subir proyectos y cambiar textos sin tocar código. Cada
 * cambio se guarda como un commit en el repositorio y Netlify vuelve a publicar la web.
 *
 * - Proyectos: un .mdoc por proyecto en src/content/proyectos, con sus fotos en
 *   src/assets/proyectos/<slug>/. Las fotos van en src/assets (no en public/) para que
 *   Astro las optimice: AVIF/WebP, varios tamaños y carga diferida.
 * - Singletons: los textos fijos de cada página, en JSON bajo src/content/paginas. Se
 *   importan tal cual desde las páginas, sin pasar por las colecciones de Astro.
 *
 * En desarrollo guarda en disco; en producción, en GitHub. El modo GitHub necesita una
 * GitHub App, y Keystatic solo deja crearla desde el servidor de desarrollo: para eso se
 * arranca en local con PUBLIC_KEYSTATIC_GITHUB=true (ver README).
 */
import { config, collection, singleton, fields } from "@keystatic/core";

const fotos = {
    directory: "src/assets/proyectos",
    // Ruta relativa desde el .mdoc, que es como la espera image() en content.config.ts.
    publicPath: "../../assets/proyectos/",
};

const textoLargo = (label: string, description?: string) =>
    fields.text({ label, description, multiline: true });

export default config({
    storage:
        import.meta.env.PROD || import.meta.env.PUBLIC_KEYSTATIC_GITHUB === "true"
            ? { kind: "github", repo: "SkylerBoy/StoneStudio-Web" }
            : { kind: "local" },

    ui: {
        brand: { name: "Stone Studio" },
        navigation: {
            Portfolio: ["proyectos"],
            Páginas: ["inicio", "marcas", "bodas", "estudio"],
            Ajustes: ["ajustes"],
        },
    },

    collections: {
        proyectos: collection({
            label: "Proyectos",
            slugField: "titulo",
            path: "src/content/proyectos/*",
            format: { contentField: "contenido" },
            entryLayout: "content",
            columns: ["titulo", "categoria", "fecha"],
            schema: {
                titulo: fields.slug({
                    name: { label: "Título", validation: { isRequired: true } },
                    slug: { label: "URL", description: "Se genera sola a partir del título." },
                }),
                categoria: fields.select({
                    label: "Categoría",
                    options: [
                        { label: "Marcas y producto", value: "marcas" },
                        { label: "Bodas y eventos", value: "eventos" },
                    ],
                    defaultValue: "marcas",
                }),
                cliente: fields.text({ label: "Cliente", description: "Marca o pareja. Opcional." }),
                lugar: fields.text({ label: "Lugar", description: "Opcional." }),
                fecha: fields.date({ label: "Fecha", validation: { isRequired: true } }),
                resumen: fields.text({
                    label: "Resumen",
                    description: "Una o dos frases. Se ve en las tarjetas del portfolio.",
                    multiline: true,
                    validation: { length: { min: 1, max: 220 } },
                }),
                destacado: fields.checkbox({
                    label: "Destacado en la portada",
                    description: "El primero destacado pone la foto grande de la portada.",
                    defaultValue: false,
                }),
                portada: fields.image({
                    label: "Foto de portada",
                    ...fotos,
                    validation: { isRequired: true },
                }),
                portadaAlt: fields.text({
                    label: "Descripción de la portada",
                    description: "Qué se ve en la foto. Lo leen los lectores de pantalla y Google.",
                    validation: { isRequired: true },
                }),
                galeria: fields.array(
                    fields.object({
                        imagen: fields.image({ label: "Foto", ...fotos, validation: { isRequired: true } }),
                        alt: fields.text({ label: "Descripción", validation: { isRequired: true } }),
                    }),
                    {
                        label: "Galería",
                        itemLabel: (props) => props.fields.alt.value || "Foto",
                    },
                ),
                contenido: fields.markdoc({
                    label: "Texto del proyecto",
                    description: "Opcional: el encargo, cómo se resolvió, qué se entregó.",
                    options: { image: false },
                }),
            },
        }),
    },

    singletons: {
        ajustes: singleton({
            label: "Datos de contacto",
            path: "src/content/paginas/ajustes",
            format: { data: "json" },
            schema: {
                email: fields.text({ label: "Email", validation: { isRequired: true } }),
                telefono: fields.text({ label: "Teléfono", description: "Con prefijo, p. ej. +34 600 000 000." }),
                whatsapp: fields.text({
                    label: "WhatsApp",
                    description: "Solo números con prefijo, sin espacios ni +. P. ej. 34600000000.",
                }),
                instagram: fields.text({ label: "Usuario de Instagram", description: "Sin @." }),
                zona: fields.text({ label: "Zona de trabajo", description: "P. ej. «Sevilla y alrededores»." }),
            },
        }),

        inicio: singleton({
            label: "Inicio",
            path: "src/content/paginas/inicio",
            format: { data: "json" },
            schema: {
                titular: fields.text({ label: "Titular", validation: { isRequired: true } }),
                subtitulo: textoLargo("Subtítulo"),
                marcasTexto: textoLargo("Texto de la tarjeta «Marcas y producto»"),
                eventosTexto: textoLargo("Texto de la tarjeta «Bodas y eventos»"),
            },
        }),

        marcas: singleton({
            label: "Marcas y producto",
            path: "src/content/paginas/marcas",
            format: { data: "json" },
            schema: {
                titular: fields.text({ label: "Titular", validation: { isRequired: true } }),
                intro: textoLargo("Introducción"),
                servicios: fields.array(
                    fields.object({
                        nombre: fields.text({ label: "Servicio" }),
                        descripcion: textoLargo("Descripción"),
                    }),
                    { label: "Servicios", itemLabel: (props) => props.fields.nombre.value || "Servicio" },
                ),
            },
        }),

        bodas: singleton({
            label: "Bodas y eventos",
            path: "src/content/paginas/bodas",
            format: { data: "json" },
            schema: {
                titular: fields.text({ label: "Titular", validation: { isRequired: true } }),
                intro: textoLargo("Introducción"),
                proceso: fields.array(
                    fields.object({
                        paso: fields.text({ label: "Paso" }),
                        descripcion: textoLargo("Descripción"),
                    }),
                    { label: "Cómo trabajamos", itemLabel: (props) => props.fields.paso.value || "Paso" },
                ),
                testimonios: fields.array(
                    fields.object({
                        autor: fields.text({ label: "Quién lo dice", description: "P. ej. «Lucía y Marcos»." }),
                        texto: textoLargo("Testimonio"),
                    }),
                    { label: "Testimonios", itemLabel: (props) => props.fields.autor.value || "Testimonio" },
                ),
                preguntas: fields.array(
                    fields.object({
                        pregunta: fields.text({ label: "Pregunta" }),
                        respuesta: textoLargo("Respuesta"),
                    }),
                    {
                        label: "Preguntas frecuentes",
                        itemLabel: (props) => props.fields.pregunta.value || "Pregunta",
                    },
                ),
            },
        }),

        estudio: singleton({
            label: "El estudio",
            path: "src/content/paginas/estudio",
            format: { data: "json" },
            schema: {
                titular: fields.text({ label: "Titular", validation: { isRequired: true } }),
                historia: textoLargo("Quiénes somos", "Separa los párrafos con una línea en blanco."),
                equipo: fields.array(
                    fields.object({
                        nombre: fields.text({ label: "Nombre" }),
                        rol: fields.text({ label: "Qué hace", description: "P. ej. «Fotografía y dirección»." }),
                    }),
                    { label: "Equipo", itemLabel: (props) => props.fields.nombre.value || "Persona" },
                ),
            },
        }),
    },
});
