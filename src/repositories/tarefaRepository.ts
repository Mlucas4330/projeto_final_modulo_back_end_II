import { AppDataSource } from '../data-source';
import { Tarefa } from '../entities/Tarefa';

export const tarefaRepository = AppDataSource.getRepository(Tarefa);