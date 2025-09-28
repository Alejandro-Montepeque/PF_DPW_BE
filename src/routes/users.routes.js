import { Router } from 'express';
import { getUsers, createUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/get_users", getUsers);

router.post("/save_users", createUser);

export default router;
