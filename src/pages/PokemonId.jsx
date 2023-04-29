import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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
        const percentBarProgress = Math.floor((stat_base * 100)/150)
        return `${percentBarProgress}%`
    }
    

    return (
        <section>
            <Header />

            <section className='px-2 py-10'>

                <article>
                    <section>
                        <h3>Stats</h3>

                        <section>
                            {
                                pokemon?.stats.map(stat => (
                                    <article key={stat.stat.name}>
                                        <section>
                                            <h5>{stat.stat.name}</h5>

                                            <span>{stat.base_stat}/150</span>
                                        </section>

                                        <div className='bg-gray-100 h-6 rounded-sm'>
                                            <div className={`h-full w-[${getPercentStatBar(stat.base_stat)}] bg-gradient-to-r from-yellow-300 to-yellow-500`}></div>
                                        </div>
                                    </article>
                                ))
                            }
                        </section>
                    </section>
                </article>
            </section>
        </section>
    )
}

export default PokemonId
