import { DataSource } from 'typeorm';
import { Pokemon } from 'src/pokemones/pokemon.entity';
import { Batalla } from './pokemones/batalla.entity';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: '/db/pokedb.db',
    entities: [Pokemon,Batalla],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
});
