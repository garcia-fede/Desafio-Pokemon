import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PokemonesService {
    constructor(@InjectRepository(Pokemon) private pokemonRepository : Repository<Pokemon>) {}

    async findAll(){
        const pokemones = await this.pokemonRepository.find()
        console.log('Encontrados: ', pokemones)
        return pokemones;
    }
}
