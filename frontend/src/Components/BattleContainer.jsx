import { Button, CardMedia, CardContent, Card, LinearProgress } from '@mui/material';
import { Axios } from 'axios';
import React, { useEffect, useState } from 'react'

const BattleContainer = ({selectedPokemon, pokemones}) => {

    const [enemyPokemon,setEnemyPokemon] = useState(pokemones[2])

    const setRandomEnemy = ()=>{
        const randomEnemy = Math.floor(Math.random() * pokemones.length);
        const selectedPokemonIndex = pokemones.findIndex(pokemon=>pokemon==selectedPokemon)
        if(randomEnemy!=selectedPokemonIndex){
            setEnemyPokemon(pokemones[randomEnemy])
        } else{
            setRandomEnemy()
        }
    }

    const recursiveBattle = (friendPokemon,enemyPokemon,turn)=>{
        console.log(friendPokemon)
        console.log(enemyPokemon)
    }

    const startBattle = ()=>{
        setRandomEnemy()
    }

    useEffect(()=>{
        setRandomEnemy()
    },[pokemones])

    return (
        <div className="battleContainer">
            <Card className='battlePokemon selectedPokemon'> 
                <CardMedia
                    component="img"
                    alt={selectedPokemon.name}
                    image={selectedPokemon.imageUrl}
                />
                <CardContent>
                    <h2>{selectedPokemon.name}</h2>
                    <p>HP</p><LinearProgress sx={{ height: 10, borderRadius: 10 }} variant="determinate" value={selectedPokemon.hp*10} />
                    <p>ATTACK</p><LinearProgress sx={{ height: 10, borderRadius: 10 }} variant="determinate" value={selectedPokemon.attack*10} />
                    <p>DEFENSE</p><LinearProgress sx={{ height: 10, borderRadius: 10 }} variant="determinate" value={selectedPokemon.defense*10} />
                    <p>SPEED</p><LinearProgress sx={{ height: 10, borderRadius: 10 }} variant="determinate" value={selectedPokemon.speed*10} />
                </CardContent>
            </Card>
            <Button 
                onClick={()=>{startBattle()}}
                variant="contained"
                color="success"
                style={{height: 'fit-content'}}>
                Start Battle
            </Button>
            {enemyPokemon && (
                <>
                    <Card className='battlePokemon enemyPokemon'> 
                        <CardMedia
                            component="img"
                            alt={enemyPokemon.name}
                            image={enemyPokemon.imageUrl}
                        />
                        <CardContent>
                            <h2>{enemyPokemon.name}</h2>
                            <p>HP</p><LinearProgress sx={{ height: 10, borderRadius: 10 }} variant="determinate" value={enemyPokemon.hp*10} />
                            <p>ATTACK</p><LinearProgress sx={{ height: 10, borderRadius: 10 }} variant="determinate" value={enemyPokemon.attack*10} />
                            <p>DEFENSE</p><LinearProgress sx={{ height: 10, borderRadius: 10 }} variant="determinate" value={enemyPokemon.defense*10} />
                            <p>SPEED</p><LinearProgress sx={{ height: 10, borderRadius: 10 }} variant="determinate" value={enemyPokemon.speed*10} />
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    )
}

export default BattleContainer