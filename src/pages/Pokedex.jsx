import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([])
    const [pokemonName, setPokemonName] = useState("")
    const [types, setTypes] = useState([])
    const [currentType, setCurrentType] = useState()

    const nameTrainer = useSelector(store => store.nameTrainer)

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)
    }

    const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))
    

    useEffect(() => {
        if(!currentType) {
            const URL = "https://pokeapi.co/api/v2/pokemon"
    
            axios.get(URL)
            .then((res) => setPokemons(res.data.results))
            .catch((err) => console.log(err))
        }
    }, [currentType])

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type"

        axios.get(URL)
        .then((res) => {
            const newTypes = res.data.results.map(type => type.name)
            setTypes(newTypes)
        }) 
        .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if(currentType){
            const URL = `https://pokeapi.co/api/v2/type/${currentType}/`

            axios.get(URL)
            .then((res) => {
                const pokemonsByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
                setPokemons(pokemonsByType)
            } )
            .catch((err) => console.log(err))
        }
        
    }, [currentType])

    return (
        <section className='min-h-screen'>
            <Header />

            <section className='py-6 px-2'>
                <h3>Welcome {nameTrainer}, here you can find your favorite Pokemon</h3>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input id='pokemonName' type="text" placeholder='Search your Pokemon' />
                        <button>Search</button>
                    </div>

                    <select onChange={(e) => setCurrentType(e.target.value)}>
                        <option value="">All</option>
                        {
                            types.map(type => 
                            <option className='capitalize' value={type} key={type}>{type}</option>)
                        }
                    </select>
                </form>
            </section>


            {/* Lista de pokemones */}
            <section className='px-2 grid gap-6 grid-cols-[290px]'>
            {
                pokemonsByName.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
            }
        </section>
        </section>

        
        
    )
}

export default Pokedex
