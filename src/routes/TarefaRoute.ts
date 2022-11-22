import { Router } from "express";
import { TarefaController } from "../controller/TarefaController";

export const TarefaRoute = Router();

const tarefaController = new TarefaController();

TarefaRoute.get('/:id_user', tarefaController.findAll);

TarefaRoute.get('/:id_user/:id', tarefaController.find);

TarefaRoute.post('/:id_user/criar', tarefaController.save)

TarefaRoute.put('/:id_user/:id', tarefaController.update);

TarefaRoute.delete('/:id_user/:id', tarefaController.delete);