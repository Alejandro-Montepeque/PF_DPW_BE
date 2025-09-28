import { User } from "../models/users.models.js";
import { transporter } from '../config/mailer.js';


export async function getUsers(req, res) {
  try {
    const users = await User.find();
    console.log("GET /get_users recibido");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
}

export async function createUser(req, res) {
 try {
    const { nombre, email, phone, message } = req.body;

    const newUser = new User({ nombre, email, phone, message });
    const savedUser = await newUser.save();

    const mailOptions = {
      from: `"Soporte ITCA" <${process.env.EMAIL_USER}>`,
      to: savedUser.email,
      subject: "Gracias por comunicarte con nosotros",
      text: `Hola, ${savedUser.nombre}\n\nGracias por comunicarte con nosotros, te contactaremos por este medio en las proximas horas.`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" Correo enviado con Gmail:", info.messageId);

    res.status(201).json({ message: "Usuario guardado y correo enviado", id: savedUser._id });
  } catch (err) {
    console.error("❌ Error al crear usuario o enviar correo:", err);
    res.status(500).json({ error: err.message });
  }
}
