import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PokemonCard = ({pokemonUrl}) => {
    const [pokemon, setPokemon] = useState()

    const bordersByType = {
        grass: "border-green-500",
        fire: "border-red-500",
        normal: "border-red-500",
        fighting: "border-red-500",
        flying: "border-red-500",
        poison: "border-red-500",
        ground: "border-red-500",
        rock: "border-red-500",
        bug: "border-red-500",
        ghost: "border-red-500",
        steel: "border-red-500",
        water: "border-red-500",
        electric: "border-red-500",
        psychic: "border-red-500",
        ice: "border-red-500",
        dragon: "border-red-500",
        dark: "border-red-500",
        fairy: "border-red-500",
        unknown: "border-red-500",
        shadow: "border-red-500"
    }

    const backgroundByType = {
        grass: "from-green-500 to-white",
        fire: "from-red-500 to-white",
        normal: "from-red-500 to-white",
        fighting: "from-red-500 to-white",
        flying: "from-red-500 to-white",
        poison: "from-red-500 to-white",
        ground: "from-red-500 to-white",
        rock: "from-red-500 to-white",
        bug: "from-red-500 to-white",
        ghost: "from-red-500 to-white",
        steel: "from-red-500 to-white",
        water: "from-red-500 to-white",
        electric: "from-red-500 to-white",
        psychic: "from-red-500 to-white",
        ice: "from-red-500 to-white",
        dragon: "from-red-500 to-white",
        dark: "from-red-500 to-white",
        fairy: "from-red-500 to-white",
        unknown: "from-red-500 to-white",
        shadow: "from-red-500 to-white",
    }

    const types = pokemon?.types.slice(0,2).map(type => type.type.name).join(" / ")

    useEffect(() => {
        axios.get(pokemonUrl)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.log)
    }, [])


    return (
        <Link to={`/pokedex/${pokemon?.id}/`} className={`text-center border-8 rounded-md bg-gradient-to-b ${bordersByType[pokemon?.types[0].type.name]}`}>
            {/* Section superior */}
            <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
                <div className='absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2'>
                    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                </div>

            </section>

            {/* Section inferior */}
            <section>
                <h3 className='capitalize mt-10'>{pokemon?.name}</h3>
                <h4 className='capitalize'>{types}</h4>
                <span>Type</span>

                <hr />

                <section className='grid grid-cols-3 gap-2 p-2'>
                    {
                        pokemon?.stats.map(stat => (
                            <div key={stat.stat.name}>
                                <h5 className='capitalize'>{stat.stat.name}</h5>
                                <span>{stat.base_stat}</span>
                            </div>
                        ))
                    }
                </section>
            </section>
        </Link>
    )
}

export default PokemonCard
