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
            {/* Parte superior */}
            <section>
                <article>
                    <div>
                        <img src="/images/pokedex-logo.png" alt="" />
                    </div>

                    <h2>!Hey Trainer!</h2>
                    <p>Give me your name to start</p>

                    <form onSubmit={handleSubmit}>
                        <input id='nameTrainer' type="text" placeholder='Type your name...' />
                        <button>Start</button>
                    </form>
                </article>
            </section>

            {/* Footer */}
            <Footer />
        </section>
    )
}

export default Home
