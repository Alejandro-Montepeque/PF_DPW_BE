# Backend - API Node.js + Express + MongoDB

Este proyecto es el backend del sistema de gestión de usuarios y contacto. Está construido con **Node.js**, **Express** y **MongoDB** usando **Mongoose** para manejar la base de datos.

---

## Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Nodemailer (para envío de correos electrónicos)
- dotenv (para manejar variables de entorno)
- CORS (para permitir peticiones desde el frontend)

---
## Funcionalidades

- CRUD de usuarios.
- Envío automático de correos al registrar un usuario.
- Validación de datos y manejo de errores.
- Conexión segura a MongoDB Atlas mediante Mongoose.
- Configuración de variables de entorno para credenciales, puerto y base URL de la API.

---

> ⚠️ Para enviar correos con Gmail, utiliza una **App Password** generada desde tu cuenta de Google.
---

## Cómo Ejecutar

1. Instala dependencias:
npm install

2. Instala dependencias:
node index.js

---
## Notas
Mongoose se encarga de la conexión y validación de la base de datos.
Nodemailer envía correos automáticamente al registrar un usuario.
Cualquier error del servidor será retornado con un mensaje JSON claro.
CORS está habilitado para que tu frontend pueda comunicarse sin problemas.
