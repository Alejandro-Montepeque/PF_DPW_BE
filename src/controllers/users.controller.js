import { User } from "../models/users.models.js";
// import { transporter } from '../config/mailer.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Listar usuarios
export async function getUsers(req, res) {
  try {
    const users = await User.find();
    console.log("GET /get_users recibido");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
}

// export async function createUser(req, res) {
//  try {
//     const { nombre, email, phone, message } = req.body;

//     const newUser = new User({ nombre, email, phone, message });
//     const savedUser = await newUser.save();

//     const mailOptions = {
//       from: `"Soporte ITCA" <${process.env.EMAIL_USER}>`,
//       to: savedUser.email,
//       subject: "Gracias por comunicarte con nosotros",
//       text: `Hola, ${savedUser.nombre}\n\nGracias por comunicarte con nosotros, te contactaremos por este medio en las proximas horas.`
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(" Correo enviado con Gmail:", info.messageId);

//     res.status(201).json({ message: "Usuario guardado y correo enviado", id: savedUser._id });
//   } catch (err) {
//     console.error("Error al crear usuario o enviar correo:", err);
//     res.status(500).json({ error: err.message });
//   }
// }

//Crear usuarios
export async function createUser(req, res) {
  try {
    const { name, email, password, password_confirmation} = req.body;

    if (password !== password_confirmation) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario creado correctamente" });

  } catch (err) {

    if (err.code === 11000) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }
    console.log("Error al crear un usuario", err);
    res.status(500).json({ error: err.message });
  }
}

//Iniciar sesión

export async function loginUser(req, res) {
  try {
      const { email, password } = req.body;


      //Buscamos el usuario mediante el correo
      const user = await User.findOne({ email });

      //Si no lo encuentra lanza el error
      if (!user) {
         return res.status(400).json({ error: "Usuario no encontrado" });
      }

      //validamos que la contraseña ingresada sea la misma que la que almacenamos en base
       const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }

      //configuramos el JWT para que el usuario pueda ingresar
      const token = jwt.sign(
        //payload
        { id: user._id, email: user.email },
        //variable extraida del .env
        process.env.JWT_SECRET,
        //Tiempo valido del jwt para que pueda hacer uso del sistema
        { expiresIn: "1h" }
      );

       res.status(200).json({
        message: "Login exitoso",
        token, // Devolvemos el token al usuario
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });

  } catch (err) {
    console.log("Error al inicar sesión", err);
    res.status(500).json({ error: err.message });
  }
}