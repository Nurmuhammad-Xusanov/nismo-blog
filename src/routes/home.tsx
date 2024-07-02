// src/components/Home.tsx
import React from 'react';
import { About, Navbar, Posts,  } from '../components';
import { FaArrowUp } from "react-icons/fa6";





const Home: React.FC = () => {
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            <button className="text-white scroll-top-wr" onClick={handleScrollTop}><FaArrowUp /></button>
            <div className={`bg-primary `}>
                <Navbar />
                <About />
                <Posts />
            </div>
        </>

    )

};

export default Home;
