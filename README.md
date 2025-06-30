# Maily 📧

**Maily** es un paquete minimalista para el envío de correos electrónicos en Node.js utilizando `nodemailer`, con soporte para plantillas HTML basadas en Handlebars y una sintaxis fluida y sencilla.

---

## 🚀 Instalación

```bash
npm install maily
```

## ⚙️ Configuración
Maily depende de los siguientes valores de entorno, que debes definir en tu archivo .env:

| Variable        | Descripción                            |
| --------------- | -------------------------------------- |
| `MAIL_HOST`     | Servidor SMTP (ej. smtp.gmail.com)     |
| `MAIL_PORT`     | Puerto SMTP (generalmente 465 o 587)   |
| `MAIL_FROM`     | Correo emisor por defecto              |
| `MAIL_PASSWORD` | Contraseña o token de la cuenta emisor |


## ✉️ Ejemplo Básico de Uso

```js
import { Mail } from 'maily';
import { env } from 'arrowy-env';

Mail.from(env('MAIL_FROM'))
  .to('destinatario@ejemplo.com')
  .subject('Asunto del correo')
  .content('<h1>Hola, este es un correo de prueba</h1>')
  .send();
```

## 🛠️ Envío de Plantillas HTML con Datos
Puedes enviar correos utilizando archivos `.html`:

```js
import { Mail } from 'maily';

await Mail.from(env('MAIL_FROM'))
    .to('destinatario@ejemplo.com')
    .html(basePath('./reporte.html'))
    .data({
        empleados: empleados,
        fecha: '2022-01-01'
    })
    .subject('Envío de reporte anual')
    .send();

Mail.from(env('MAIL_FROM'))
  .to('destinatario@ejemplo.com')
  .cc('copia@ejemplo.com')
  .bcc('oculto@ejemplo.com')
  .subject('Correo con adjunto')
  .content('<p>Se adjunta el documento solicitado.</p>')
  .attachments([
    { filename: 'documento.pdf', path: './ruta/documento.pdf' }
  ])
  .send();
```

## ✅ Métodos Disponibles

| Método                  | Descripción                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `from(emisor)`          | Define el remitente (aunque se usa `MAIL_FROM` por defecto) |
| `to(destinatario)`      | Destinatario del correo                                     |
| `cc(copia)`             | Copia visible                                               |
| `bcc(copia)`            | Copia oculta                                                |
| `subject(asunto)`       | Asunto del correo                                           |
| `content(html)`         | Contenido HTML directo                                      |
| `html(rutaHtml)`        | Ruta a plantilla `.html` para usar con Handlebars           |
| `data(objeto)`          | Datos a inyectar en la plantilla                            |
| `attachments(archivos)` | Adjuntos como array de objetos `{ filename, path }`         |
| `send()`                | Envía el correo                                             |


## 🐞 Manejo de Errores y Respuesta
Por defecto, los errores se lanzan automáticamente y los envíos exitosos se imprimen en consola. Si deseas personalizar este comportamiento:

```js
Mail.from(env('MAIL_FROM'))
  .to('destinatario@ejemplo.com')
  .subject('Correo')
  .content('<p>Prueba</p>')
  .onSuccess(info => console.log('Enviado:', info.response))
  .onError(error => console.error('Error al enviar:', error))
  .send();
```

## 📦 Dependencias
nodemailer
arrowy-env
handlebars
fs

## 📝 Licencia
MIT © 2025 Cristian Guzmán