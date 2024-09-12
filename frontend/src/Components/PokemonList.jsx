import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Axios from "axios";
import { Container } from '@mui/material';

const PokemonList = () => {
    
    const [pokemones,setPokemons] = useState([])

    const getPokemons = ()=>{
        console.log("ENtre")
        Axios.get("http://localhost:3001/pokemones")
        .then((response) => {
            console.log("GET Exitoso, pokemones guardados.")
            setPokemons(Array.from(response.data));
            console.log(response.data)
        })
        .catch((error) => {
            console.log("Error al realizar el GET")
            console.error(error);
        })
        .finally(() => {
            console.log("Proceso finalizado")
        });
    }

    useEffect(()=>{
        getPokemons()
    },[])


    return (
        <Container >

        <div className='pokemonContainer'>
            {pokemones.map((pokemon,index)=>{
                return (
                    <Card className='pokemonCard' key={index}> 
                        <CardContent>
                            <img src={pokemon.imageUrl} alt={pokemon.name} />
                            <h2>{pokemon.name}</h2>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
        </Container>
    )
}

export default PokemonList