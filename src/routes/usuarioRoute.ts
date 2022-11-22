import { Request, response, Response, Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";


export const usuarioRoute = Router();

const usuarioController = new UsuarioController();

usuarioRoute.post('/', usuarioController.login);

usuarioRoute.post('/register', usuarioController.salvar);

