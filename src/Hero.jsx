import React from "react";
import './Hero.scss';

function Hero() {
    return (
        <>
            {/* Första sektionen */}
            <section className="hero hero--first">
                <div className="hero-inner">
                    <div className="hero-inner__image-container">
                        <img src="./src/images/Hands.jpg" alt="RonjaAndPatrik" className="hero-inner__image-item" />
                        <img src="./src/images/Holding.JPG" alt="RonjaAndPatrik" className="hero-inner__image-item" />
                    </div>
                    <h1 className="hero-inner__topic">We are getting married</h1>
                </div>
            </section>

            {/* Andra sektionen */}
            <section className="hero hero--second">
                <div className="hero-inner__content">
                    <h3 className="hero-inner__topic-ronja">Ronja Lejonqvist</h3>
                    <p className="hero-inner__topic-and">AND</p>
                    <h3 className="hero-inner__topic-patrik">Richard Gardebo</h3>
                </div>
                <div className="hero-image1">
                    <img src="./src/images/Untitled (500 x 500 px).svg" alt="flowers" className="hero-image1__item1"></img>   
                </div> 
                <div className="hero-image2">
                    <img src="./src/images/Untitled (500 x 500 px).svg" alt="flowers" className="hero-image2__item2"></img>
                </div>
            </section>
        </>
    );
}

export default Hero;