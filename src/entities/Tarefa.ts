import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Tarefa {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text'
    })
    descricao: string

    @Column({
        type: 'text'
    })
    detalhamento: string

    @ManyToOne(() => Usuario, usuario => usuario.id)
    @JoinColumn({
        name: 'id_usuario'
    })
    id_usuario: number
}
