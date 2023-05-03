import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/pokedex/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";
import { paginationLogic } from "../utils/pagination";
import FooterDiego from "../components/FooterDiego";

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([]);

    const [pokemonName, setPokemonName] = useState("");

    const [types, setTypes] = useState([]);

    const [currentType, setCurrentType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const nameTrainer = useSelector((store) => store.nameTrainer);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPokemonName(e.target.pokemonName.value);
    };

    const pokemonsByName = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
    );

    

    const { pokemonInPage, lastPage, pagesInBlock, PAGES_PER_BLOCK, POKEMONS_PER_PAGE } = useMemo(() => paginationLogic(currentPage, pokemonsByName), [currentPage, pokemons, pokemonName, currentType]) 

    const handleClickPreviousPage = () => {
        const newCurrentPage = currentPage - 1;
        if (newCurrentPage >= 1) {
        setCurrentPage(newCurrentPage);
        }
    };

    const handleClickNextPage = () => {
        const newCurrentPage = currentPage + 1;
        if (newCurrentPage <= lastPage) {
        setCurrentPage(newCurrentPage);
        }
    };

    useEffect(() => {
        if (!currentType) {
        const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

        axios
            .get(URL)
            .then((res) => setPokemons(res.data.results))
            .catch((err) => console.log(err));
        }
    }, [currentType]);

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type";

        axios
        .get(URL)
        .then((res) => {
            const newTypes = res.data.results.map((type) => type.name);
            setTypes(newTypes);
        })
        .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (currentType) {
        const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;

        axios
            .get(URL)
            .then((res) => {
            const pokemonsByType = res.data.pokemon.map(
                (pokemon) => pokemon.pokemon
            );
            setPokemons(pokemonsByType);
            })
            .catch((err) => console.log(err));
        }
    }, [currentType]);

    useEffect(() => {
        setCurrentPage(1);
    }, [pokemonName, currentType]);

    return (
        <section className="min-h-screen">
            <Header />

            <section className="pt-6 px-2 flex flex-col justify-center items-center">
                <h3 className="mt-4 mb-6 text-center">
                <span className="font-semibold text-red-500">
                    Welcome {nameTrainer},
                </span>{" "}
                you can find your favorite Pokemon here!
                </h3>

                <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-8 md:gap-6 mb-6 md:mb-0 w-full md:h-10 md:flex-row md:justify-center md:max-w-[80%]"
                >
                <div className="flex flex-col items-center gap-2 md:gap-0 w-full md:w-[50%] md:flex-row md:justify-center md:mr-4 md:h-full ">
                    <input
                    className="shadow-md shadow-black/30 rounded h-10 mb-4 md:mb-0 w-[85%] md:w-80 outline-0 px-4 max-w-[24rem] md:rounded-tl-md md:rounded-bl-md md:rounded-none"
                    id="pokemonName"
                    type="text"
                    placeholder="Search your Pokemon"
                    />
                    <button className="bg-red-500 shadow-md shadow-black/30 hover:bg-red-600 h-full text-white max-w-max px-10 py-2 rounded-md md:rounded-none md:rounded-tr-md md:rounded-br-md">
                    Search
                    </button>
                </div>

            
                <select
                    className="shadow-md shadow-black/30 rounded-md outline-0 w-[85%] max-w-[12rem] md:max-w-[15rem] h-10 pl-4 text-slate-700"
                    onChange={(e) => setCurrentType(e.target.value)}
                >
                    <option value="">All Pokemon</option>
                    {types.map((type) => (
                    <option
                        className="option capitalize py-6 text-red-500"
                        value={type}
                        key={type}
                    >
                        {type}
                    </option>
                    ))}
                </select>
                </form>
            </section>

            {/* Pokemon list */}
            <section className="px-6 md:px-12 py-4 md:py-12 grid gap-6 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_320px))] justify-center max-w-[1500px] mx-auto">
                {pokemonInPage.map((pokemon) => (
                <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
                ))}
            </section>


            {/* Pagination */}
            <section className="h-[6rem] grid place-items-center">
                <ul className="flex gap-3 justify-center mb-4 mx-2 flex-wrap">
                    <li
                        onClick={() => setCurrentPage(1)}
                        className={`${
                        currentPage <= PAGES_PER_BLOCK && "hidden"
                        } py-3 px-[1px] font-bold text-red-500 text-lg rounded-md cursor-pointer hover:scale-125`}
                    >
                        {"<<"}
                    </li>

                    <li
                        onClick={handleClickPreviousPage}
                        className={`${
                        currentPage < 2 && "hidden"
                        } py-3 px-[1px] font-bold text-red-500 text-lg rounded-md cursor-pointer hover:scale-125`}
                    >
                        {"<"}
                    </li>

                    {pagesInBlock.map((numberPage) => (
                        <li
                        onClick={() => setCurrentPage(numberPage)}
                        key={numberPage}
                        className={`p-2 bg-red-500 font-bold text-white rounded-md cursor-pointer ${
                            numberPage === currentPage &&
                            "bg-red-700 border-[1px] border-red-900 scale-110"
                        } hover:bg-red-300`}
                        >
                        {numberPage}
                        </li>
                    ))}

                    <li
                        onClick={handleClickNextPage}
                        className={`${
                        currentPage === lastPage && "hidden"
                        } p-3 font-bold text-red-500 text-lg py-3 px-[1px] hover:scale-125 rounded-md cursor-pointer`}
                    >
                        {">"}
                    </li>

                    <li
                        onClick={() => setCurrentPage(lastPage)}
                        className={`${
                        currentPage === lastPage && "hidden"
                        } p-3 font-bold text-red-500 text-lg py-3 px-[1px] hover:scale-125 rounded-md cursor-pointer`}
                    >
                        {">>"}
                    </li>
                </ul>
            </section>
            
            <section className="h-16 mt-4">
                <FooterDiego />
            </section>
        </section>
    );
};

export default Pokedex;
