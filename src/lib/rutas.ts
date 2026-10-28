/**
 * Enlaces internos. La web puede publicarse en la raíz de un dominio (Netlify) o bajo una
 * subruta (la vista previa de GitHub Pages, /StoneStudio-Web/), así que ningún enlace
 * interno se escribe a mano con «/» delante: se pasa por ruta().
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** ruta("/marcas") → "/marcas" en Netlify, "/StoneStudio-Web/marcas" en la vista previa. */
export function ruta(destino: string): string {
    return `${base}${destino}` || "/";
}

/** La ruta de la página actual sin la subruta ni la barra final, para marcar el menú. */
export function rutaActual(url: URL): string {
    const sinBase = url.pathname.startsWith(base) ? url.pathname.slice(base.length) : url.pathname;
    return sinBase.replace(/\/$/, "") || "/";
}

/** En la vista previa el formulario no envía y la web no se indexa. */
export const VISTA_PREVIA = import.meta.env.PUBLIC_VISTA_PREVIA === "true";
