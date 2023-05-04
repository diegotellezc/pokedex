import React from 'react'

const Footer = () => {
    return (
        <footer className='relative'>
            <div className='h-20 bg-red-600'></div>
            <div className='h-14 bg-black'></div>

            <div className="h-20 aspect-square rounded-full bg-white border-[8px] border-black absolute bottom-3 left-1/2 -translate-x-1/2 after:content-[''] after:h-12 after:aspect-square after:rounded-full after:bg-gray-700 after:absolute after:border-[9px] after:border-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"></div>

            <div className='absolute top-[-120px] right-8 md:top-[-180px] md:right-4 w-32 md:w-48 lg:right-16'>
                <img src="/images/pikachu.png" alt="Pikachu" />
            </div>
        </footer>
    )
}

export default Footer
