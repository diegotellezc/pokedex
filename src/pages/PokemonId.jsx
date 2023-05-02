import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { backgroundByType, backgroundGradientByType, colorTextByType } from '../constants.js'

const PokemonId = () => {
    const [pokemon, setPokemon] = useState()

    const {id} = useParams()

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

        axios.get(URL)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log(err))
    }, [])

    const getPercentStatBar = (stat_base) => {
        const percentBarProgress = Math.floor((stat_base * 100)/255)
        return `${percentBarProgress}%`
    }
    

    return (
        <section>
            <Header />

            <section className='px-2 py-10 mt-12'>

                <article className='max-w-[900px] mx-auto shadow-lg'>
                    {/* Image section */}
                    <section className={`bg-gradient-to-b ${backgroundGradientByType[pokemon?.types[0].type.name]} rounded-tl-lg rounded-tr-lg relative h-[140px]`}>
                        <div className='absolute bottom-3 w-[190px] left-1/2 -translate-x-1/2 hover:scale-110 duration-500'>
                            {/* <img src={pokemon?.sprites.versions['generation-v']['black-white'].animated.front_default} alt="" /> */}
                            <img className='hover:animate-bounce' src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
                        </div>
                    </section>

                    <section className='bg-white p-6 rounded-bl-lg rounded-br-lg'>
                        {/* General information */}
                        <section className=''>
                            <div className='mx-auto border-2 max-w-max px-2 mb-4'>
                                <h3># {pokemon?.id}</h3>
                            </div>

                            <div className={`grid grid-cols-[1fr_auto_1fr] items-center gap-2 capitalize font-bold text-shadow-md ${colorTextByType[pokemon?.types[0].type.name]}`}>
                                <hr />
                                <h1 className='text-2xl md:text-3xl'>{pokemon?.name}</h1>
                                <hr />
                            </div>

                            <div className='flex justify-center gap-6 text-center text-xs p-6 '>
                                <div className='grid gap-2'>
                                    <h5>Weight</h5>
                                    <span className='font-bold text-sm'>{pokemon?.weight}</span>
                                </div>

                                <div className='grid gap-2'>
                                    <h5>Height</h5>
                                    <span className='font-bold text-sm'>{pokemon?.height}</span>
                                </div>
                            </div>

                            {/* Types and abilities */}
                            <section className='flex flex-col md:flex-row md:justify-center md:gap-16'>

                                {/* Types section */}
                                <section className='flex flex-col justify-center items-center gap-4 flex-wrap my-4 text-center'>
                                    <h3>Types</h3>
                                    
                                    <section className='flex justify-center gap-4 flex-wrap'>
                                        {
                                            pokemon?.types.map((type, i) => <article key={type.type.name} className={`rounded-md text-white font-semibold capitalize max-w-max py-1 px-8 border-[1px] border-gray-300 shadow-md hover:border-gray-600 ${backgroundByType[pokemon?.types[i].type.name]}`}>{type.type.name}</article>
                                            )
                                        }
                                    </section>
                                </section>
                                
                                {/* Abilities section */}
                                <section className='flex flex-col justify-center items-center gap-4 flex-wrap my-4 text-center'>
                                    <h3>Abilities</h3>
                                    
                                    <section className='flex justify-center gap-4 flex-wrap'>
                                        {
                                            pokemon?.abilities.map((ability) => <article key={ability.ability.name} className={` rounded-md text-white font-semibold capitalize max-w-max py-1 px-8 hover:border-gray-600 border-[1px] border-gray-300 shadow-md ${backgroundByType[pokemon?.types[0].type.name]}`}>{ability.ability.name}</article>
                                            )
                                        }
                                    </section>
                                </section>
                            </section>
                        </section>


                        {/* Stats section */}
                        <section className='px-2 md:px-10'>
                            <div className='grid grid-cols-[auto_1fr] items-center gap-2 font-bold mt-8 mb-2 text-lg'>
                                <h3>Stats</h3>
                                <hr />
                            </div>

                            <section className='flex flex-col gap-4'>
                                {
                                    pokemon?.stats.map(stat => (
                                        <article key={stat.stat.name}>
                                            <section className='flex justify-between text-xs'>
                                                <h5 className='font-semibold capitalize'>{stat.stat.name}</h5>

                                                <span>{stat.base_stat}/255</span>
                                            </section>

                                            <div className='bg-gray-100 h-4 rounded-sm'>
                                                <div style={{"width": getPercentStatBar(stat.base_stat)}} className='h-full bg-gradient-to-r from-yellow-300 to-yellow-500'></div>
                                            </div>
                                        </article>
                                    ))
                                }
                            </section>
                        </section>
                    </section>
                </article>
            </section>
        </section>
    )
}

export default PokemonId
