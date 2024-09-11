import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';

export class Populacion1726094977969 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //Crear la tabla para poder insertar los pokemones mas adelante (Se debe crear porque en data-source la sincronización está desactivada, sino se crearía solo)
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS pokemon(
                id TEXT PRIMARY KEY,
                name TEXT,
                attack INT,
                defense INT,
                hp INT,
                speed INT,
                type TEXT,
                imageUrl TEXT
            )
        `);

        //Se requiere leer el pokemon.JSON e insertarlo en la DB en una migración
        const filePath = path.join(__dirname, '../../src/pokemones/pokemon.json');
        
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const pokemones = JSON.parse(fileContent);

        for (const pokemon of pokemones.pokemon) {
            //Verificar si hay algun pokemon cuyo nombre se repita, va a retornar un array (Se puede definir un booleano con la longitud del array)
            const checkRepeat = await queryRunner.query(
                `SELECT 1 FROM pokemon WHERE name = ?`,[pokemon.name] 
            )

            const pokemonExists : boolean = checkRepeat.length > 0

            if(pokemonExists) {
                //Si existe, no insertar a la tabla
                continue;
            } else {
                //Si no existe, insertarlo a la tabla
                await queryRunner.query(
                    `INSERT INTO pokemon (id, name, attack, defense, hp, speed, type, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [pokemon.id, pokemon.name, pokemon.attack, pokemon.defense, pokemon.hp, pokemon.speed, pokemon.type, pokemon.imageUrl]
                );
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Aquí puedes implementar cómo revertir la migración si es necesario
        await queryRunner.query(`DELETE FROM pokemon`);
    }

}
