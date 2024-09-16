import { MigrationInterface, QueryRunner } from "typeorm";

export class TablaBattle1726456463566 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS battle(
                id INT PRIMARY KEY,
                selectedPokemon TEXT,
                enemyPokemon TEXT,
                ganador TEXT
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
