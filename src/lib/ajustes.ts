/**
 * Datos de contacto editables desde el panel, con los enlaces ya montados para que el
 * pie, el formulario y las páginas legales no repitan la misma lógica.
 */
import datos from "../content/paginas/ajustes.json";

export const ajustes = {
    ...datos,
    mailto: `mailto:${datos.email}`,
    tel: datos.telefono ? `tel:${datos.telefono.replace(/\s+/g, "")}` : undefined,
    whatsappUrl: datos.whatsapp ? `https://wa.me/${datos.whatsapp}` : undefined,
    instagramUrl: datos.instagram ? `https://www.instagram.com/${datos.instagram}/` : undefined,
};
