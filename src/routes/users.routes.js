import { Router } from 'express';
import { getUsers, createUser, loginUser } from "../controllers/users.controller.js";

const router = Router();

/* Rutas de usuarios
    Listar Usuarios
    Crear usuarios
    Loguear usuarios
*/
//listar usuarios
router.get("/get_users", getUsers);

//crear usuarios
router.post("/save_users", createUser);

//loguear usuarios
router.post("/login", loginUser);

export default router;
