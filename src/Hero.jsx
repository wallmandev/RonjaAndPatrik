import React, { useEffect, useState } from "react";
import './Hero.scss';

function Hero() {
    const [isScrolled, setIsScrolled] = useState(false);  
    const [hasVisited, setHasVisited] = useState(null);  // Initiera som `null` för att fördröja rendering

    useEffect(() => {
        const sessionVisited = sessionStorage.getItem("hasVisited");

        if (sessionVisited) {
            setHasVisited(true); // Användaren har besökt sidan tidigare
        } else {
            setHasVisited(false); // Användaren har inte besökt sidan tidigare
        }

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            if (scrollPosition > windowHeight / 2) {
                setIsScrolled(true);
                setHasVisited(true);
                sessionStorage.setItem("hasVisited", true); // Spara besöksstatus i sessionStorage
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Vänta på att kontrollera `sessionStorage` innan något renderas
    if (hasVisited === null) {
        return null; // Returnera ingenting medan `sessionStorage` laddas
    }

    return (
        <>
            {/* Visa inte hero--second om användaren har besökt sidan tidigare */}
            {!hasVisited && (
                <section className={`hero hero--second ${isScrolled ? 'hidden' : ''}`}>
                    <div className="hero-inner__content">
                        <h3 className="hero-inner__topic-ronja">Ronja Lejonqvist</h3>
                        <p className="hero-inner__topic-and">AND</p>
                        <h3 className="hero-inner__topic-patrik">Patrik Gaerdbo</h3>
                    </div>
                    <div className="hero-image1">
                        <img src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).png`} alt="flowers" className="hero-image1__item1" />
                    </div> 
                    <div className="hero-image2">
                        <img src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).png`} alt="flowers" className="hero-image2__item2" />
                    </div>
                    <div className="scroll-down">
                        <span className="arrow"></span>
                    </div>
                </section>
            )}

            <section className={`hero hero--first ${isScrolled || hasVisited ? 'visible' : ''}`}>
                <div className="hero-inner">
                    <div className="hero-inner__image-container">
                        <img className="hero-randp" rel="preload" src="./images/PatrikAndRonjaDoor.png" as="image" />
                    </div>
                    <h1 className={`hero-inner__topic ${isScrolled || hasVisited ? 'fade-in' : ''}`}>We are getting married</h1>
                </div>
            </section>
        </>
    );
}

export default Hero;