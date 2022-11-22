import { Request, Response } from 'express';
import { usuarioRepository } from '../repositories/usuarioRepository';

export class UsuarioController {
    async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            if (!email) {
                res.status(403).send({
                    ok: false,
                    error: 'Email is required'
                });
            }

            if (!senha) {
                res.status(403).send({
                    ok: false,
                    error: 'Password is required'
                });
            }

            const usuario = await usuarioRepository.find({
                where: {
                    email: email,
                    senha: senha
                }
            })

            if(!usuario){
                res.status(403).send({
                    ok: false,
                    message: "Account doesn't exist",
                });
            }

            res.status(200).send({
                ok: true,
                message: 'Login successfully',
                data: usuario
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                error: error.toString()
            });
        }
    }

    async salvar(req: Request, res: Response) {
        try {
            const { email, senha, Rsenha } = req.body;

            if (!email) {
                res.status(403).send({
                    ok: false,
                    error: 'Name is required'
                });
            }

            if (!senha) {
                res.status(403).send({
                    ok: false,
                    error: 'Password is required'
                });
            }

            if (!Rsenha || senha !== Rsenha) {
                res.status(403).send({
                    ok: false,
                    error: 'Password do not match'
                });
            }

            const newUsuario = usuarioRepository.create({
                email,
                senha
            });

            const usuario = await usuarioRepository.find({
                where: {
                    email: email,
                    senha: senha
                }
            })

            if(usuario){
                res.status(201).send({
                    ok: false,
                    message: 'Account already exists',
                });
            }


            await usuarioRepository.save(newUsuario);

            res.status(201).send({
                ok: true,
                message: 'Account created successfully',
                data: newUsuario
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                error: error
            });
        }
    }
}
