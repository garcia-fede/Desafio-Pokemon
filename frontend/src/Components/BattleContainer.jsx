import { Button, CardMedia, CardContent, Card } from '@mui/material';
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
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    )
}

export default BattleContainer