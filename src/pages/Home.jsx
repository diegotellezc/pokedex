import React from 'react'
import Footer from '../components/Footer'
import { useDispatch } from 'react-redux'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const dispatch = useDispatch()
    const navigate =useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate("/pokedex")
    }
    
    return (
        <section className='min-h-screen grid grid-rows-[1fr_auto]'>
            {/* Top section */}
            <section className='grid place-items-center'>
                <article className='flex flex-col items-center'>
                    <div className='w-[80%] z-10 mb-16'>
                        <img src="/images/pokedex-logo.png" alt="" />
                    </div>

                    <h2 className='text-2xl lg:text-4xl text-red-500 font-bold mb-2'>Hey Trainer!</h2>
                    <p className='text-md lg:text-xl mb-8 md:mb-12'>Do you want to be a Pokemon trainer?</p>

                    <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 w-full h-24 md:h-12 md:flex-row md:gap-0 md:justify-center'>
                        <input className='w-[80%] max-w-sm h-12 shadow-md shadow-black/30 md:h-full md:w-80 outline-0 px-4 rounded-md md:rounded-tr-none md:rounded-br-none md:rounded-tl-md md:rounded-bl-md' id='nameTrainer' type="text" placeholder='Type your name...' />
                        <button className='bg-red-500 shadow-md shadow-black/30 hover:bg-red-600 md:h-full text-white max-w-max px-10 py-2 rounded-md md:rounded-tl-none md:rounded-bl-none md:rounded-tr-md md:rounded-br-md'>Start</button>
                    </form>
                </article>
            </section>

            {/* Image */}
            <div className='absolute top-11 left-14 w-48 opacity-50 lg:opacity-80 lg:left-32'>
                <img src="/images/ash.png" alt="pokeball" />
            </div>

            {/* Footer */}
            <Footer />
        </section>
    )
}

export default Home
