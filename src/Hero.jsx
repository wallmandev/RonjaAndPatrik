import React, { useRef, useEffect, useState } from "react";
import "./Hero.scss";

function Hero() {
    const [showSecondHero, setShowSecondHero] = useState(false);
    const [showFirstHero, setShowFirstHero] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [isFirstHeroVisible, setIsFirstHeroVisible] = useState(false); // Nytt state
    const imageRef = useRef(null);
    const firstHeroRef = useRef(null); // Ref för hero--first

    useEffect(() => {
        // Kontrollera om användaren har besökt sidan tidigare
        const hasVisited = sessionStorage.getItem("hasVisited");

        if (!hasVisited) {
            console.log("Första besöket, visa hero--second.");
            setShowSecondHero(true); // Visa hero--second
            sessionStorage.setItem("hasVisited", "true"); // Markera som besökt
        } else {
            console.log("Återbesök, visa hero--first direkt.");
            setShowFirstHero(true); // Visa hero--first direkt
            setShowImage(true); // Visa bilden direkt
        }
    }, []);

    useEffect(() => {
        // Trigger animationen när showImage är true
        if (showImage) {
            const timer = setTimeout(() => {
                setShouldAnimate(true);
            }, 50); // Vänta 50ms för att trigga animationen
            return () => clearTimeout(timer);
        }
    }, [showImage]);

    useEffect(() => {
        // Scroll-logik: Växla till hero--first när användaren scrollar
        const handleScroll = () => {
            const scrollThreshold = 300; // Tröskel för scroll

            if (showSecondHero && window.scrollY > scrollThreshold) {
                console.log("Scrollat förbi hero--second, visa hero--first.");
                setShowSecondHero(false); // Dölj hero--second
                setShowFirstHero(true); // Visa hero--first
                setShowImage(true); // Visa bilden
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [showSecondHero]);

    useEffect(() => {
        if (showFirstHero && firstHeroRef.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    console.log(
                        "IntersectionObserver - entry.isIntersecting:",
                        entry.isIntersecting
                    );
                    if (entry.isIntersecting) {
                        console.log("hero--first är nu synlig!");
                        setIsFirstHeroVisible(true);
                    } else {
                        console.log("hero--first är inte längre synlig.");
                        setIsFirstHeroVisible(false);
                    }
                },
                { threshold: 0.4 }
            );
    
            console.log("Observerar hero--first.");
            observer.observe(firstHeroRef.current);
    
            return () => {
                observer.disconnect(); // Rensa observern
            };
        } else {
            console.log("hero--first är inte renderad ännu.");
        }
    }, [showFirstHero]); // Kör endast när showFirstHero blir true
    

    useEffect(() => {
        console.log("isFirstHeroVisible:", isFirstHeroVisible);
        console.log("shouldAnimate:", shouldAnimate);
    }, [isFirstHeroVisible, shouldAnimate]);

    return (
        <>
            {/* Hero Second */}
            {showSecondHero && (
                <section className="hero hero--second">
                    <div className="hero-inner__content">
                        <h3 className="hero-inner__topic-ronja">Ronja Lejonqvist</h3>
                        <p className="hero-inner__topic-and">AND</p>
                        <h3 className="hero-inner__topic-patrik">Patrik Gaerdbo</h3>
                    </div>
                    <div className="hero-image1">
                        <img
                            src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).png`}
                            alt="flowers"
                            className="hero-image1__item1"
                        />
                    </div>
                    <div className="hero-image2">
                        <img
                            ref={imageRef}
                            src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).png`}
                            alt="flowers"
                            className="hero-image2__item2"
                        />
                    </div>
                    <div className="scroll-down">
                        <span className="arrow"></span>
                    </div>
                </section>
            )}

            {/* Hero First */}
            {showFirstHero && (
                <section
                    ref={firstHeroRef} // Lägg till ref för att observera hero--first
                    className={`hero hero--first ${showFirstHero ? "visible" : ""}`}
                >
                    <div className="hero-inner">
                        <div className="hero-inner__image-container">
                            <div className="hero-inner__image-container-denise">
                                <h1 className='rsvp-form__photoDenise'>© Denise Sant</h1>
                                <h1 className='rsvp-form__photoDeniseInsta'>@denisesant_photography</h1>
                            </div>
                            <img
                                ref={imageRef} // Ref för hero-randp
                                className={`hero-randp ${
                                    isFirstHeroVisible && shouldAnimate ? "visible" : ""
                                }`}
                                src="/images/PatrikAndRonjaHigh.jpg"
                                alt="Hero Background"
                                rel="preload"
                                as="image"
                            />
                        </div>
                        <h1 className="hero-inner__topic">We are getting married</h1>
                    </div>
                </section>
            )}
        </>
    );
}

export default Hero;