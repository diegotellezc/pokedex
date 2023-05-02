import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([])

    const [pokemonName, setPokemonName] = useState("")

    const [types, setTypes] = useState([])

    const [currentType, setCurrentType] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const nameTrainer = useSelector(store => store.nameTrainer)

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)
    }

    const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))

    const paginationLogic = () => {
        // Cantidad de pokemones por página
        const POKEMONS_PER_PAGE = 12

        // Pokemones que se van a mostrar en la página actual
        const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
        const sliceEnd = sliceStart + POKEMONS_PER_PAGE
        const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)

        const lastPage = pokemonsByName.length
            ? Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE)
            : 1;

        const PAGES_PER_BLOCK = 5
        const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

        const pagesInBlock = []
        const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
        const maxPage = actualBlock * PAGES_PER_BLOCK
        for(let i = minPage; i <= maxPage; i++){
            if(i<= lastPage){
                pagesInBlock.push(i)
            }
        }

        return { pokemonInPage, lastPage, pagesInBlock }
    }
    
    const { pokemonInPage, lastPage, pagesInBlock } = paginationLogic()


    const handleClickPreviousPage = () => {
        const newCurrentPage = currentPage - 1
        if(newCurrentPage >= 1) {
            setCurrentPage(newCurrentPage)
        }
    }

    const handleClickNextPage = () => {
        const newCurrentPage = currentPage + 1
        if(newCurrentPage <= lastPage) {
            setCurrentPage(newCurrentPage)
        }
    }
    

    useEffect(() => {
        if(!currentType) {
            const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"
    
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

    useEffect(()=> {
        setCurrentPage(1)
    }, [pokemonName, currentType])

    return (
        <section className='min-h-screen'>
            <Header />

            <section className='py-6 px-2 flex flex-col justify-center items-center mx-auto'>
                <h3 className='mb-6'>
                    <span className='font-semibold text-red-500'>Welcome {nameTrainer},</span>  you can find your favorite Pokemon here!</h3>

                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-8 mb-6 lg:mb-0 lg:gap-12 h-10 lg:flex-row'>
                    <div className='mr-4 h-full'>
                        <input className='shadow-md shadow-black/30 h-full w-80 outline-0 px-4 rounded-tl-md rounded-bl-md' id='pokemonName' type="text" placeholder='Search your Pokemon' />
                        <button className='bg-red-500 shadow-md shadow-black/30 hover:bg-red-600 h-full text-white max-w-max px-10 py-2 rounded-tr-md rounded-br-md'>Search</button>
                    </div>

                    <select className='shadow-md shadow-black/30 rounded-md outline-0 w-80 h-10 pl-4 text-slate-700' onChange={(e) => setCurrentType(e.target.value)}>
                        <option value="">All Pokemon</option>
                        {
                            types.map(type => 
                            <option className='option capitalize py-6 text-red-500' value={type} key={type}>{type}</option>)
                        }
                    </select>
                </form>
            </section>

            {/* Paginación */}
            <ul className='flex gap-3 justify-center py-4 px-2 flex-wrap'>
                <li onClick={() => setCurrentPage(1)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<<"}</li>
                <li onClick={handleClickPreviousPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{"<"}</li>
                {
                    pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} key={numberPage} className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage === currentPage && "bg-red-400"}`}>{numberPage}</li>)
                }
                <li onClick={handleClickNextPage} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">"}</li>
                <li onClick={() => setCurrentPage(lastPage)} className='p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer'>{">>"}</li>
            </ul>


            {/* Lista de pokemones */}
            <section className='px-6 md:px-12 py-12 grid gap-6 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_320px))] justify-center'>
            {
                pokemonInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
            }
        </section>
        </section>

        
        
    )
}

export default Pokedex
