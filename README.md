# Prueba-PDF-Crop

Este proyecto es una demostración de cómo cargar un PDF, renderizar la primera página en un canvas usando **pdfjs-dist**, convertirlo en una imagen y luego aplicar una funcionalidad de recorte mediante **react-image-crop**. Todo el procesamiento ocurre en el navegador.

## 📦 Librerías Involucradas

- **react** y **react-dom**  
  Base para construir la interfaz de usuario con React.

- **pdfjs-dist**  
  Utilizada para cargar y renderizar archivos PDF. Internamente usa PDF.js. Renderiza la primera página en un canvas, que luego se convierte a imagen (base64) mediante `canvas.toDataURL()`.

- **react-image-crop**  
  Componente que permite al usuario seleccionar y recortar una región de la imagen generada. Admite recortes responsivos, con aspecto fijo u opcional.

## 🧭 Flujo del Proyecto

1. **Selección del PDF:**  
   El usuario carga un archivo `.pdf` a través de un input de archivo.

2. **Renderizado con PDF.js:**  
   La primera página del PDF se renderiza en un canvas oculto utilizando `pdfjs-dist`.

3. **Conversión a Imagen:**  
   El contenido del canvas se convierte en una imagen base64 (formato PNG).

4. **Recorte Interactivo:**  
   Se muestra la imagen en el componente `ReactCrop`, permitiendo al usuario seleccionar un área a recortar.

5. **Confirmación de Recorte:**  
   Al confirmar el recorte, se muestra la imagen recortada final generada con un canvas auxiliar.



## 🌐 Versión Online

Este proyecto está publicado en GitHub Pages y puede ser utilizado directamente desde el navegador, sin necesidad de clonar ni instalar nada.

🚀 Usar online:  
[https://braianazcune.github.io/Prueba-PDF-Crop/](https://braianazcune.github.io/Prueba-PDF-Crop/)


## ▶️ Cómo usar

1. Cloná el repositorio:

   ```bash
   git clone https://github.com/tuusuario/prueba-pdf.git
   cd prueba-pdf
   ```

2. Instalá las dependencias:

   ```bash
   pnpm install
   ```

3. Ejecutá la aplicación en modo desarrollo:

   ```bash
   pnpm run dev
   ```

4. Abrí el navegador en `http://localhost:5173`, cargá un archivo PDF, seleccioná un área de recorte y confirmá para ver el resultado.

---
