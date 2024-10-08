import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { Repository } from 'typeorm';
import { Batalla } from './batalla.entity';

@Injectable()
export class PokemonesService {
    constructor(@InjectRepository(Pokemon) private pokemonRepository : Repository<Pokemon>) {}

    //Función para listar todos los pokemones desde la DB

    async findAll(){
        const pokemones = await this.pokemonRepository.find()
        console.log('Encontrados: ', pokemones)
        return pokemones;
    }

    // Funciones para batalla de pokemones: battlePokemons - calculateDamage - decideWinner

    calculateDamage (defense : number, damage : number) : number {
        let damageDone = damage - defense;
        //Si la el ataque restado por la defensa es cero, debe ser el daño minimo (1)
        //COMENTARIO: Es raro que se ponga esta condición porque si se analiza los valores de daño y defensa de todos los pokemones, todos los potenciales ataques son de 1 hp
        if (damageDone<1) damageDone=1; 
        return damageDone;
    }

    decideWinner (selectedPokemon : Pokemon , enemyPokemon : Pokemon , selectedAttacks : boolean) : Batalla {
        if(selectedAttacks){
            //El pokemon seleccionado ataca al enemigo
            const newEnemyPokemonHp = enemyPokemon.hp - this.calculateDamage(enemyPokemon.defense,selectedPokemon.attack)
            enemyPokemon.hp = newEnemyPokemonHp
            if(enemyPokemon.hp>0){
                return this.decideWinner(selectedPokemon,enemyPokemon, !selectedAttacks);
            } else{
                // return `El ganador de la batalla es ${selectedPokemon.name}`
                const winner = new Batalla()
                winner.id = null;
                winner.selectedPokemon = selectedPokemon.name;
                winner.enemyPokemon = enemyPokemon.name;
                winner.ganador = selectedPokemon.name;
                return winner;
            }
        } else{
            //El pokemon enemigo ataca al seleccionado
            const newSelectedPokemonHp = selectedPokemon.hp - this.calculateDamage(selectedPokemon.defense,enemyPokemon.attack)
            selectedPokemon.hp = newSelectedPokemonHp
            if(selectedPokemon.hp>0){ 
                    return this.decideWinner(selectedPokemon,enemyPokemon, !selectedAttacks);
            } else{
                // return `El ganador de la batalla es ${enemyPokemon.name}`
                const winner = new Batalla()
                winner.id = null;
                winner.selectedPokemon = enemyPokemon.name;
                winner.enemyPokemon = selectedPokemon.name;
                winner.ganador = enemyPokemon.name;
                return winner;
            }
        }
    }

    battlePokemons(selectedPokemon,enemyPokemon){
        console.log(selectedPokemon)
        let result : Batalla;
        
        if(selectedPokemon.speed>enemyPokemon.speed){
            result = this.decideWinner(selectedPokemon, enemyPokemon, true)
        } else if(selectedPokemon.speed==enemyPokemon.speed){
            if(selectedPokemon.attack>enemyPokemon.attack){
                result = this.decideWinner(selectedPokemon, enemyPokemon, true)
            } else if(selectedPokemon.attack==enemyPokemon.attack){
                //ESTE CASO NO FUE MENCIONADO EN LA CONSIGNA, DONDE LA VELOCIDAD Y ATAQUE EMPATAN - GENERA UN BUCLE INFINITO SI NO SE PONE LA CONDICION
                result = this.decideWinner(selectedPokemon, enemyPokemon, true)
            } 
            else{
                result = this.decideWinner(selectedPokemon, enemyPokemon, false)
            }
        } else{
            result = this.decideWinner(selectedPokemon, enemyPokemon, false)
        }

        console.log(result)
        return result;
    }

    //Función para guardar resultado de la batalla en la DB

    
}
