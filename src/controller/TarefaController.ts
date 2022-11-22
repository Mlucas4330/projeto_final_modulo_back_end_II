import { Request, Response } from 'express';
import { tarefaRepository } from '../repositories/tarefaRepository';

export class TarefaController {
    find(req: Request, res: Response) {
        try {
            const { id_user } = req.params;
            let id_user_int = parseInt(id_user);

            const tasks_por_user = tarefaRepository.find({
                where: {
                    id_usuario: id_user_int
                }
            });

            res.status(200).send({
                ok: true,
                message: 'Tarefas recuperadas com sucesso',
                data: tasks_por_user
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                error: error
            });
        }
    }

    findAll(req: Request, res: Response) {
        try {
            const { id_user, id } = req.params;
            let id_int = parseInt(id);
            let id_user_int = parseInt(id_user);

            const task_por_user = tarefaRepository.findOne({
                where: {
                    id: id_int,
                    id_usuario: id_user_int
                }
            });

            if (!task_por_user) {
                res.status(404).send({
                    ok: false,
                    error: 'Task not found'
                });
            }
            res.status(200).send({
                ok: true,
                message: 'Tarefa recuperada com sucesso',
                data: task_por_user
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                error: error
            });
        }
    }

    async save(req: Request, res: Response) {
        try {
            const { descricao, detalhamento } = req.body;
            const { id_usuario_string } = req.params;
            const id_usuario = parseInt(id_usuario_string);

            if (!descricao) {
                res.status(403).send({
                    ok: false,
                    error: 'Description is required'
                });
            }

            if (!detalhamento) {
                res.status(403).send({
                    ok: false,
                    error: 'Details are required'
                });
            }

            const newTarefa = tarefaRepository.create({
                descricao,
                detalhamento,
                id_usuario
            });

            await tarefaRepository.save(newTarefa);

            res.status(201).send({
                ok: true,
                message: 'Task added successfully',
                data: newTarefa
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                error: error
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const int_id = parseInt(id);
            const { descricao, detalhamento } = req.body;

            if (!descricao) {
                res.status(403).send({
                    ok: false,
                    error: 'Description is required'
                });
            }

            if (!detalhamento) {
                res.status(403).send({
                    ok: false,
                    error: 'Details are required'
                });
            }


            const tarefa = await tarefaRepository.update({
                id: int_id
            }, {
                descricao: descricao,
                detalhamento: detalhamento
            })

            res.status(200).send({
                ok: true,
                message: 'Tarefa recuperada com sucesso',
                data: tarefa
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                error: error
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const int_id = parseInt(id);


            const tarefa = await tarefaRepository.delete({
                id: int_id
            })


            res.status(200).send({
                ok: true,
                message: 'Tarefa excluída com sucesso',
                data: tarefa
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                error: error
            });
        }
    }
}
