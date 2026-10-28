# CLAUDE.md

Web de Stone Studio (fotografía y edición). Todo —commits, comentarios, interfaz— va en
español. El README explica el stack, la estructura y el despliegue.

## Comandos

```bash
npm run dev       # servidor de desarrollo; panel en /keystatic
npm run build     # build de producción
npm run check     # tipos (astro check)
```

Antes de dar por buena una tarea: `npm run build` y `npm run check` sin errores.

## Reglas

- **Contenido editable = Keystatic.** Si un texto o una foto lo va a cambiar el estudio, va
  en `keystatic.config.ts`, no escrito en la página. Los campos de proyectos están
  duplicados en `src/content.config.ts`: si se toca uno, se toca el otro.
- **Fotos en `src/assets/`, nunca en `public/`**, para que Astro las optimice. Siempre con
  `<Image>` o `getImage()` de `astro:assets` y con `alt`.
- **Paleta y fuentes:** tokens del bloque `@theme` de `src/styles/global.css`
  (`background`, `surface`, `line`, `text`, `muted`, `accent`, `font-serif`, `font-sans`).
  Nada de hexadecimales sueltos. El texto pequeño nunca en `accent-soft` (no da contraste).
- Clases base compartidas en `global.css`: `contenedor`, `etiqueta`, `titulo-display`,
  `boton`, `boton-secundario`, `enlace`, `prosa`. Úsalas antes de inventar variantes.
- Sin cookies ni servicios de terceros que carguen desde otro dominio (fuentes incluidas):
  la política de privacidad lo promete.
- Cuatro espacios de sangría. Los comentarios cuentan el porqué, no lo que dice el código.

## Commits

Conventional Commits con el asunto en español: `tipo(ámbito): qué cambia`, en minúscula y
sin punto final. Tipos: `feat`, `fix`, `refactor`, `chore`, `content`. Ámbitos: `portfolio`,
`servicios`, `presupuesto`, `panel`, `ui`, `legal`, `seo`. El cuerpo explica por qué.
