# Stone Studio · web

Web del estudio de fotografía y edición [@bystonestudio](https://www.instagram.com/bystonestudio/):
portfolio, servicios para marcas y para bodas/eventos, y formulario de presupuesto.

## Tecnologías

| Pieza | Para qué |
|---|---|
| [Astro 7](https://astro.build) | Web estática; optimiza las fotos (AVIF/WebP, varios tamaños, carga diferida) |
| Tailwind CSS 4 | Estilos. Paleta y fuentes en `src/styles/global.css` |
| [Keystatic](https://keystatic.com) | Panel en `/keystatic` para que el estudio edite sin tocar código |
| PhotoSwipe | Visor de fotos a pantalla completa en cada proyecto |
| Netlify | Hosting, formulario de presupuesto (Netlify Forms) y CDN de imágenes |
| Instrument Serif + Inter | Tipografías, servidas desde el propio dominio (Fontsource) |

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321  ·  panel en http://localhost:4321/keystatic
npm run build
npm run check     # tipos
```

Hace falta Node 22.22 o superior. En el build, las fotos se sirven con el CDN de imágenes
de Netlify, así que `astro preview` no las muestra en local; para revisar, usa `npm run dev`.

## Dónde está cada cosa

```
keystatic.config.ts          qué se puede editar desde el panel
src/content.config.ts        esquema de los proyectos para Astro (debe ir a la par del anterior)
src/content/proyectos/       un .mdoc por proyecto
src/content/paginas/         textos de cada página y datos de contacto (JSON)
src/assets/proyectos/<slug>/ fotos de cada proyecto
src/pages/                   páginas
src/components/              piezas compartidas (tarjeta, galería, cabecera…)
src/styles/global.css        paleta, fuentes y clases base
```

## Editar contenido

- **En local:** `npm run dev` y entrar en `/keystatic`. Los cambios se guardan como archivos;
  luego se hace commit.
- **En la web publicada:** entrar en `https://<dominio>/keystatic` e iniciar sesión con GitHub.
  Cada cambio es un commit en `main` y Netlify vuelve a publicar en un par de minutos.

Al añadir un proyecto: título, categoría, fecha, resumen, portada (con su descripción) y las
fotos de la galería. Marcar «Destacado» lo lleva a la portada; el destacado más reciente pone
la foto grande de arriba.

Fotos: mejor en JPG a unos 2500–3000 px por el lado largo. Astro genera los tamaños
pequeños; subir archivos de 20 MB solo hace más lento el repositorio.

## Vista previa en GitHub Pages

Cada push a `dev/skyler` o `main` publica una vista previa en
<https://skylerboy.github.io/StoneStudio-Web/> (workflow `.github/workflows/vista-previa.yml`).
Es para enseñar la web mientras se prepara, no el hosting final: Pages solo sirve archivos,
así que ahí no hay panel de edición y el formulario aparece desactivado. Las páginas llevan
`noindex` y un aviso de «vista previa».

La primera vez hay que activarlo en *Settings → Pages → Source: GitHub Actions* y volver a
lanzar el workflow desde la pestaña *Actions*.

Para probar ese modo en local: `PUBLIC_VISTA_PREVIA=true npm run build`.

## Publicar en Netlify (primera vez)

1. En Netlify, «Add new site» → importar este repositorio. La configuración ya está en
   `netlify.toml`.
2. **Formularios:** en *Site configuration → Forms*, activar la detección de formularios
   (en sitios nuevos viene apagada). Después, en *Form notifications*, añadir el email
   del estudio para recibir cada solicitud.
3. **Dominio:** en *Domain management*, añadir el dominio propio y marcarlo como principal.
   La web toma la dirección de Netlify al compilar, así que no hay que tocar código.
4. **Panel en producción:** entrar en `https://<dominio>/keystatic`. La primera vez,
   Keystatic guía para crear una GitHub App; al terminar, añadir en Netlify las variables
   que indica (`KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
   `KEYSTATIC_SECRET` y `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`) y volver a publicar. Cada
   persona del estudio necesita una cuenta de GitHub con acceso al repositorio.

## Pendiente del estudio

- [ ] Fotos reales (20–40, por proyecto) para sustituir las provisionales.
- [ ] Logo (mejor en SVG). Ahora el nombre va en texto y el favicon es una «S».
- [ ] Textos: titular, quiénes son, servicios, testimonios y preguntas frecuentes reales.
- [ ] Datos de contacto reales y zona de trabajo (`src/content/paginas/ajustes.json`).
- [ ] Datos legales: titular, NIF y domicilio. Están resaltados en `/aviso-legal` y
      `/privacidad` (componente `Pendiente`). Conviene que alguien con criterio legal
      revise esos textos.
- [ ] Dominio definitivo.

Para quitar los proyectos de ejemplo: borrarlos desde el panel (o sus `.mdoc` y su carpeta en
`src/assets/proyectos/`).
