# 🌿 Plantilla de Invitación de Boda Chamánica / Shamanic Wedding Template

Una plantilla moderna, inmersiva y de alto rendimiento construida con **Next.js**, **Tailwind CSS** y **Framer Motion**. Diseñada originalmente para una unión matrimonial chamánica en la selva amazónica, esta plantilla es perfecta para bodas espirituales, retiros, o eventos en la naturaleza.

## ✨ Características Principales

- 🎵 **Paisaje Sonoro Generativo**: Utiliza la Web Audio API para generar un fondo musical ambiental (viento, río, notas de flauta) sin necesidad de cargar pesados archivos MP3.
- 🌌 **Animaciones Inmersivas**: Efectos celestiales de partículas (luciérnagas, estrellas fugaces y destellos) usando `framer-motion`.
- 🌍 **Soporte Multilingüe (i18n)**: Textos separados en archivos JSON (`en.json`, `es.json`) con un botón de cambio de idioma en tiempo real.
- 📱 **Integración de RSVP con WhatsApp**: Formulario de confirmación de asistencia que redirige automáticamente a un chat de WhatsApp con los datos del invitado pre-llenados.
- ⏱️ **Cuenta Regresiva (Countdown)**: Temporizador animado en tiempo real hasta la fecha del evento.
- 🃏 **Tarjetas 3D (Tilt Cards)**: Efectos interactivos al pasar el ratón sobre los detalles de la ceremonia y elementos sagrados.

## 🚀 Tecnologías

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI & Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Iconos & Tipografía**: Fuentes optimizadas y SVGs integrados.

## 📦 Instalación y Uso

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/invitacion-boda.git
   cd invitacion-boda
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 🛠️ Cómo Personalizar esta Plantilla

### 1. Textos e Idiomas
Todos los textos están centralizados en la carpeta `src/locales/`. 
Modifica `es.json` (Español) y `en.json` (Inglés) para cambiar los nombres de los novios, la fecha, la historia y la información del evento.

### 2. Número de WhatsApp para Confirmación (RSVP)
Abre el archivo `src/app/page.js` y busca la constante `WHATSAPP_NUMBER`.
```javascript
// src/app/page.js
const WHATSAPP_NUMBER = "51999999999"; // Reemplaza con tu código de país y número
```

### 3. Fecha de la Cuenta Regresiva
Abre `src/components/ui/Countdown.js` y modifica la constante `TARGET_DATE`:
```javascript
// src/components/ui/Countdown.js
const TARGET_DATE = new Date("2027-09-25T09:30:00-05:00"); // Usa tu fecha y zona horaria
```

### 4. Imágenes y Recursos
Reemplaza las imágenes en la carpeta `public/assets/` con las de tu propio evento:
- `rio_mayo_bg.jpg` (Fondo principal)
- Iconos de la ceremonia (`icon_calendar.png`, etc.)
- Imágenes de los elementos (`ayahuasca_liana.png`, etc.)

### 5. Mapa de Google Maps
En `src/app/page.js`, busca la etiqueta `<iframe>` de Google Maps dentro de la sección "Ceremony Details" y reemplaza la URL del atributo `src` con el enlace "Embed" de la ubicación de tu evento.

## 📜 Licencia

Este proyecto está bajo la licencia MIT. Eres libre de usarlo, modificarlo y adaptarlo para tu evento especial.

---
*Hecho con ♥ y magia para uniones sagradas.*
