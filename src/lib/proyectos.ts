/**
 * Acceso a los proyectos del portfolio. Centraliza el orden (más reciente primero) y los
 * nombres de categoría para que todas las páginas los muestren igual.
 */
import { getCollection, type CollectionEntry } from "astro:content";

export type Proyecto = CollectionEntry<"proyectos">;
export type Categoria = Proyecto["data"]["categoria"];

export const CATEGORIAS: Record<Categoria, { nombre: string; servicio: string }> = {
    marcas: { nombre: "Marcas y producto", servicio: "/marcas" },
    eventos: { nombre: "Bodas y eventos", servicio: "/bodas-y-eventos" },
};

export async function obtenerProyectos(categoria?: Categoria): Promise<Proyecto[]> {
    const todos = await getCollection("proyectos", (p) => !categoria || p.data.categoria === categoria);
    return todos.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

export function urlProyecto(p: Proyecto): string {
    return `/portfolio/${p.data.categoria}/${p.id}`;
}

const formatoFecha = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" });

export function fechaLegible(fecha: Date): string {
    return formatoFecha.format(fecha);
}
