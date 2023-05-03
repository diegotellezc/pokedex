import React from 'react'

const FooterDiego = () => {
    return (
        <footer className='mt-auto flex flex-col items-center text-dark-green mb-6 gap-2 md:flex-row md:justify-evenly'>
            
            <div className='flex gap-x-4 md:order-last'>
                <a className='text-4xl text-secondary-color hover:text-primary-color hover:animate-bounce hover:text-red-500' target='_blank' href="https://github.com/diegotellezc">
                    <i className='bx bxl-github' ></i>
                </a>

                <a className='text-4xl text-secondary-color hover:text-primary-color hover:animate-bounce hover:text-red-500' target='_blank' href="https://www.linkedin.com/in/diegotellezc/">
                    <i className='bx bxl-linkedin-square' ></i>
                </a>

                <a className='text-4xl text-secondary-color hover:text-primary-color hover:animate-bounce hover:text-red-500' target='_blank' href="https://www.instagram.com/diegotellezc/">
                    <i className='bx bxl-instagram-alt' ></i>
                </a>

                <a className='text-4xl text-secondary-color hover:text-primary-color hover:animate-bounce hover:text-red-500' target='_blank' href="https://rickandmorty-bydt.netlify.app/">
                    <i className='bx bx-question-mark' ></i>
                </a>
            </div>

            <p className='md:order-2 text-secondary-color'>• All rights reserved ©2023 • </p>
            <p className='text-secondary-color'>@diegotellezc</p>
        </footer>
    )
}

export default FooterDiego
