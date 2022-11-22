import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668731104369 implements MigrationInterface {
    name = 'default1668731104369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tarefa" ("id" SERIAL NOT NULL, "descricao" text NOT NULL, "detalhamento" text NOT NULL, "id_usuario" integer, CONSTRAINT "PK_df7268dfad5b4b665bcee2ae8b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tarefa" ADD CONSTRAINT "FK_2659024480b55046fab06a1f780" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarefa" DROP CONSTRAINT "FK_2659024480b55046fab06a1f780"`);
        await queryRunner.query(`DROP TABLE "tarefa"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
