import { DataSource } from 'typeorm';
import { Pokemon } from 'src/pokemones/pokemon.entity';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'pokemonesdb',
    entities: [Pokemon],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
});
