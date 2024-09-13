import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { Repository } from 'typeorm';

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

    decideWinner (selectedPokemon : Pokemon , enemyPokemon : Pokemon , selectedAttacks : boolean) : String {
        if(selectedAttacks){
            //El pokemon seleccionado ataca al enemigo
            // console.log("TURNO DE ",selectedPokemon.name)
            const newEnemyPokemonHp = enemyPokemon.hp - this.calculateDamage(enemyPokemon.defense,selectedPokemon.attack)
            enemyPokemon.hp = newEnemyPokemonHp
            // console.log("FIN DE TURNO, VIDA DE Seleccionado: ",selectedPokemon.hp," - VIDA DE Enemigo: ",enemyPokemon.hp)
            if(enemyPokemon.hp>0){
                return this.decideWinner(selectedPokemon,enemyPokemon, !selectedAttacks);
            } else{
                return `El ganador de la batalla es ${selectedPokemon.name}`
            }
        } else{
            //El pokemon enemigo ataca al seleccionado
            // console.log("TURNO DE ",enemyPokemon.name)
            const newSelectedPokemonHp = selectedPokemon.hp - this.calculateDamage(selectedPokemon.defense,enemyPokemon.attack)
            selectedPokemon.hp = newSelectedPokemonHp
            // console.log("FIN DE TURNO, VIDA DE Seleccionado: ",selectedPokemon.hp," - VIDA DE Enemigo: ",enemyPokemon.hp)
            if(selectedPokemon.hp>0){ 
                    return this.decideWinner(selectedPokemon,enemyPokemon, !selectedAttacks);
            } else{
                return `El ganador de la batalla es ${enemyPokemon.name}`
            }
        }
    }

    battlePokemons(selectedPokemon,enemyPokemon){
        console.log(selectedPokemon)
        let result : String;
        
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

        return result;
    }

    //Función para guardar resultado de la batalla en la DB

    
}
