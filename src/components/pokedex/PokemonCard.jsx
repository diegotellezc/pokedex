import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { bordersByType, backgroundGradientByType, colorTextByType } from '../../constants.js'

const PokemonCard = ({pokemonUrl}) => {
    const [pokemon, setPokemon] = useState()


    const types = pokemon?.types.slice(0,2).map(type => type.type.name).join(" / ")

    useEffect(() => {
        axios.get(pokemonUrl)
        .then((res) => setPokemon(res.data))
        .catch((err) => console.log)
    }, [])


    return (
        <Link to={`/pokedex/${pokemon?.id}/`} className={`text-center border-8 rounded-md shadow-lg group shadow-black/40 ${bordersByType[pokemon?.types[0].type.name]}`}>
            {/* Section superior */}
            <section className={`bg-gradient-to-b ${backgroundGradientByType[pokemon?.types[0].type.name]} relative h-[160px]`}>
                <div className='absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2 group-hover:scale-110 duration-500'>
                    <img className='group-hover:animate-bounce' src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
                </div>
            </section>

            {/* Section inferior */}
            <section className='bg-white'>
                <h3 className={`capitalize pt-14 text-3xl mb-2 font-semibold ${colorTextByType[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h3>
                <h4 className='capitalize text-md text-slate-700'>{types}</h4>
                <span className='text-sm text-gray-400'>Type</span>

                <hr className='mt-4' />

                <section className='grid grid-cols-3'>
                    {
                        pokemon?.stats.map(stat => (
                            <div className='p-3 flex flex-col justify-between' key={stat.stat.name}>
                                <h5 className='capitalize text-gray-400 text-sm mb-2'>{stat.stat.name}</h5>
                                <span className={`${colorTextByType[pokemon?.types[0].type.name]} text-xl`}>{stat.base_stat}</span>
                            </div>
                        ))
                    }
                </section>
            </section>
        </Link>
    )
}

export default PokemonCard
