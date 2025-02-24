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




// import React, { useRef, useEffect, useState } from "react";
// import "./Hero.scss";

// function Hero() {
//     const [showSecondHero, setShowSecondHero] = useState(false);
//     const [showFirstHero, setShowFirstHero] = useState(false);
//     const [showImage, setShowImage] = useState(false);
//     const [shouldAnimate, setShouldAnimate] = useState(false);
//     const imageRef = useRef(null);

//     useEffect(() => {
//         // Kontrollera om användaren har besökt sidan tidigare
//         const hasVisited = sessionStorage.getItem("hasVisited");

//         if (!hasVisited) {
//             console.log("Första besöket, visa hero--second.");
//             setShowSecondHero(true); // Visa hero--second
//             sessionStorage.setItem("hasVisited", "true"); // Markera som besökt
//         } else {
//             console.log("Återbesök, visa hero--first direkt.");
//             setShowFirstHero(true); // Visa hero--first direkt
//             setShowImage(true); // Visa bilden direkt
//         }
//     }, []);

//     useEffect(() => {
//         // Trigger animationen när showImage är true
//         if (showImage) {
//             const timer = setTimeout(() => {
//                 setShouldAnimate(true);
//             }, 50); // Vänta 50ms för att trigga animationen
//             return () => clearTimeout(timer);
//         }
//     }, [showImage]);

//     useEffect(() => {
//         // Scroll-logik: Växla till hero--first när användaren scrollar
//         const handleScroll = () => {
//             const scrollThreshold = 300; // Tröskel för scroll

//             if (showSecondHero && window.scrollY > scrollThreshold) {
//                 console.log("Scrollat förbi hero--second, visa hero--first.");
//                 setShowSecondHero(false); // Dölj hero--second
//                 setShowFirstHero(true); // Visa hero--first
//                 setShowImage(true); // Visa bilden
//             }
//         };

//         window.addEventListener("scroll", handleScroll);

//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, [showSecondHero]);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setIsVisible(true); // Trigga fade-in
//                 }
//             },
//             { threshold: 0.4 } // Triggar när 10% av elementet är i vyn
//         );

//         if (imageRef.current) {
//             observer.observe(imageRef.current);
//         }

//         return () => {
//             if (imageRef.current) {
//                 observer.unobserve(imageRef.current);
//             }
//         };
//     }, []);

//     return (
//         <>
//             {/* Hero Second */}
//             {showSecondHero && (
//                 <section className="hero hero--second">
//                     <div className="hero-inner__content">
//                         <h3 className="hero-inner__topic-ronja">Ronja Lejonqvist</h3>
//                         <p className="hero-inner__topic-and">AND</p>
//                         <h3 className="hero-inner__topic-patrik">Patrik Gaerdbo</h3>
//                     </div>
//                     <div className="hero-image1">
//                         <img
//                             src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).png`}
//                             alt="flowers"
//                             className="hero-image1__item1"
//                         />
//                     </div>
//                     <div className="hero-image2">
//                         <img
//                             ref={imageRef}
//                             src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).png`}
//                             alt="flowers"
//                             className="hero-image2__item2"
//                         />
//                     </div>
//                     <div className="scroll-down">
//                         <span className="arrow"></span>
//                     </div>
//                 </section>
//             )}

//             {/* Hero First */}
//             {showFirstHero && (
//                 <section className={`hero hero--first ${showFirstHero ? "visible" : ""}`}>
//                     <div className="hero-inner">
//                         <div className="hero-inner__image-container">
//                             <img
//                                 // className={`hero-randp ${showImage ? "visible" : ""}`}
//                                 className={`hero-randp ${shouldAnimate ? "visible" : ""}`}
//                                 src="/images/PatrikAndRonjaHigh.jpg"
//                                 alt="Hero Background"
//                             />
//                         </div>
//                         <h1 className="hero-inner__topic">We are getting married</h1>
//                     </div>
//                 </section>
//             )}
//         </>
//     );
// }

// export default Hero;




// import React, { useEffect, useRef, useState } from "react";
// import "./Hero.scss";

// function Hero() {
//     const [showSecondHero, setShowSecondHero] = useState(false);
//     const [showFirstHero, setShowFirstHero] = useState(false);
//     const [isHeroFirstVisible, setIsHeroFirstVisible] = useState(false); // För hero--first fade-in
//     const [isImageVisible, setIsImageVisible] = useState(false); // För att hantera fade-in på bilden
//     const heroFirstRef = useRef(null);
//     const imageRef = useRef(null);

//     useEffect(() => {
//         const VISIT_KEY = "hasVisited";
//         const TIMESTAMP_KEY = "visitTimestamp";
//         const ANIMATION_KEY = "heroFirstAnimation"; // Nyckel för animation

//         // Hämta tidsstämpeln och nuvarande tid
//         const lastVisitTimestamp = sessionStorage.getItem(TIMESTAMP_KEY);
//         const currentTimestamp = new Date().getTime();

//         // Rensa sessionStorage om det gått mer än 15 minuter (15 * 60 * 1000 ms)
//         if (lastVisitTimestamp && currentTimestamp - lastVisitTimestamp > 15 * 60 * 1000) {
//             sessionStorage.removeItem(VISIT_KEY);
//             sessionStorage.removeItem(TIMESTAMP_KEY);
//             sessionStorage.removeItem(ANIMATION_KEY);
//         }

//         const hasVisited = sessionStorage.getItem(VISIT_KEY);
//         const hasAnimated = sessionStorage.getItem(ANIMATION_KEY);

//         if (!hasVisited) {
//             setShowSecondHero(true);
//             sessionStorage.setItem(VISIT_KEY, true);
//             sessionStorage.setItem(TIMESTAMP_KEY, currentTimestamp);
//         } else {
//             setShowFirstHero(true);
//             // Om animationen redan har körts, visa hero--first utan animation
//             if (hasAnimated) {
//                 setIsHeroFirstVisible(true);
//             }
//         }
//     }, []);

//     useEffect(() => {
//         if (showSecondHero) {
//             const handleScroll = () => {
//                 const scrollThreshold = 300; // Justera detta värde efter behov
//                 if (window.scrollY > scrollThreshold) {
//                     setShowSecondHero(false); // Dölj hero--second
//                     setShowFirstHero(true);  // Visa hero--first
//                 }
//             };
    
//             window.addEventListener("scroll", handleScroll);
    
//             return () => {
//                 window.removeEventListener("scroll", handleScroll);
//             };
//         }
//     }, [showSecondHero]);
    

//     // Initiera IntersectionObserver för hero--first
//     useEffect(() => {
//         if (showFirstHero && !sessionStorage.getItem("heroFirstAnimation")) {
//             const observer = new IntersectionObserver(
//                 (entries) => {
//                     entries.forEach((entry) => {
//                         if (entry.isIntersecting) {
//                             setIsHeroFirstVisible(true);
//                             sessionStorage.setItem("heroFirstAnimation", true); // Markera att animationen körts
//                         }
//                     });
//                 },
//                 { threshold: 0.5 }
//             );

//             if (heroFirstRef.current) {
//                 observer.observe(heroFirstRef.current);
//             }

//             return () => {
//                 if (heroFirstRef.current) observer.unobserve(heroFirstRef.current);
//             };
//         } else {
//             setIsHeroFirstVisible(true); // Visa direkt om animationen redan har körts
//         }
//     }, [showFirstHero]);

//     useEffect(() => {
//         if (showFirstHero) {
//             const observer = new IntersectionObserver(
//                 (entries) => {
//                     entries.forEach((entry) => {
//                         if (entry.isIntersecting) {
//                             setIsImageVisible(true);
//                         }
//                     });
//                 },
//                 { threshold: 0.5 }
//             );

//             if (imageRef.current) {
//                 observer.observe(imageRef.current);
//             }

//             return () => {
//                 if (imageRef.current) observer.unobserve(imageRef.current);
//             };
//         }
//     }, [showFirstHero]);

//     return (
//         <>
//             {showSecondHero && (
//                 <section className="hero hero--second">
//                     <div className="hero-inner__content">
//                         <h3 className="hero-inner__topic-ronja">Ronja Lejonqvist</h3>
//                         <p className="hero-inner__topic-and">AND</p>
//                         <h3 className="hero-inner__topic-patrik">Patrik Gaerdbo</h3>
//                     </div>
                    // <div className="hero-image1">
                    //     <img src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).png`} alt="flowers" className="hero-image1__item1" />
                    // </div>
                    // <div className="hero-image2">
                    //     <img src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).png`} alt="flowers" className="hero-image2__item2" />
                    // </div>
//                     <div className="scroll-down">
//                         <span className="arrow"></span>
//                     </div>
//                 </section>
//             )}

//             {showFirstHero && (
//                 <section
//                     className={`hero hero--first ${isHeroFirstVisible ? "visible" : ""}`}
//                     ref={heroFirstRef}
//                 >
//                     <div className="hero-inner">
//                         <div
//                             className={`hero-inner__image-container ${
//                                 isImageVisible ? "visible" : ""
//                             }`}
//                         >
//                             <img
//                                 className={`hero-randp ${isImageVisible ? "visible" : ""}`}
//                                 src="/images/PatrikAndRonjaHigh.jpg"
//                                 alt="Hero Background"
//                                 ref={imageRef}
//                             />
//                         </div>
//                         <h1 className="hero-inner__topic">We are getting married</h1>
//                     </div>
//                 </section>
//             )}
//         </>
//     );
// }

// export default Hero;