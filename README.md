
E-Commerce App

[![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

Este es un proyecto de una aplicación de comercio electrónico desarrollada con Next.js, React Query y Tailwind CSS. La aplicación permite a los usuarios explorar productos, ver detalles, añadir al carrito y visualizar productos relacionados.

---


## 📌 Características

### 1. Página de productos
- Lista de productos paginados  
- Filtro por categorías  
- Enlaces a detalles  

### 2. Página de detalles del producto
- Información detallada del producto  
- Productos relacionados (excluyendo el actual)  
- Añadir al carrito  

### 3. Carrito de compras
- Persistencia en `localStorage`  
- Subtotal, impuestos y total  
- Eliminar productos  

### 4. Optimización de imágenes
- `next/image` para optimizar  
- Configuración para imágenes externas  

### 5. Rutas dinámicas
- Rutas dinámicas con `useParams` de Next.js  

---

## 🛠️ Tecnologías utilizadas

- **Next.js** – Framework para React con SSR  
- **React Query** – Manejo de datos asíncronos  
- **Tailwind CSS** – Estilos rápidos y reutilizables  
- **TypeScript** – Tipado estático para seguridad  
- **Fake Store API** – Fuente de datos  

---

## ⚙️ Requisitos previos

- Node.js  
- npm o yarn  

---

## 🚀 Instalación

1. Clona el repositorio  
```bash
git clone <URL_DEL_REPOSITORIO>
cd e-commerce
Instala dependencias

bash
Copiar
Editar
npm install
Ejecuta el servidor local

bash
Copiar
Editar
npm run dev
🧠 Decisiones técnicas
React Query
Eficiencia en el manejo de datos, caché y sincronización.

Carrito persistente
Uso de localStorage para mantener el estado.

Tailwind CSS
Estilos rápidos, sin escribir CSS tradicional.

Next.js
SSR + rutas dinámicas para rendimiento y SEO.

Manejo de errores
Mensajes de error y carga para mejor UX.

🧩 Desafíos enfrentados
Tailwind CSS: Solucionado leyendo la documentación oficial.

Despliegue: Después de probar alternativas, usé Vercel por su integración con Next.js.

🛤️ Próximos pasos
✅ Mejorar accesibilidad

✅ Agregar autenticación

✅ Conectar un backend real

👩‍💻 Autor
Alexa Parra
📧 paalexandra.1994@gmail.com
