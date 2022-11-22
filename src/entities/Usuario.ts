import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Tarefa } from "./Tarefa";

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string
    
    @Column()
    senha: string

    @OneToMany(() => Tarefa, tarefa => tarefa.id_usuario)
    tarefas: Tarefa[]
}