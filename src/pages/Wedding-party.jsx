import React, { useState, useEffect, useRef } from "react";
import './Schedule.scss';

function Schedule() {
    const images = [
        `${import.meta.env.BASE_URL}images/IMG_1359-min.jpeg`,
        `${import.meta.env.BASE_URL}images/IMG_3977-min.jpeg`,
        `${import.meta.env.BASE_URL}images/IMG_3978-min.jpeg`,
        `${import.meta.env.BASE_URL}images/IMG_3982-min.jpeg`
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loadedImages, setLoadedImages] = useState([]); // Hanterar förladdade bilder
    const containerRef = useRef(null);

    // Förladda bilder med löften (Promise)
    useEffect(() => {
        const loadImages = async () => {
            const promises = images.map(src => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img.src);
                    img.onerror = reject;
                });
            });

            const loaded = await Promise.all(promises);
            setLoadedImages(loaded); // Sparar laddade bilder
        };

        loadImages();
    }, [images]);

    // Bildbyte och övergångseffekt
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % loadedImages.length);
                setIsTransitioning(false);
            }, 400); // Övergångstid matchar CSS
        }, 5000); // Bildbyte var 5:e sekund

        return () => clearInterval(interval);
    }, [loadedImages.length]);

    // Observer för mjuk inladdningseffekt
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Stop observing efter fade-in
                    }
                });
            },
            {
                threshold: 0.3, // 30% av elementet måste vara synligt
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div className="container" ref={containerRef}>
            <div className="container-inner">
                <section className="schedule">

                    {/* Bildspel */}
                    <div className="slideshow">
                        {loadedImages.length > 0 && (
                            <img
                                className={`slideshow__image ${isTransitioning ? 'fade-outt' : 'fade-inn'}`}
                                src={loadedImages[currentImageIndex]}
                                alt="Slideshow"
                            />
                        )}
                        <h2 className="image-copyright">Copyright Lillegård</h2>
                    </div>

                    <div className="schedule-subheader">
                        <h4 className="schedule-subheader__time">14:00</h4>
                    </div>

                    <div className="schedule-area">
                        <h4 className="schedule-area__adress">Our lovely venue is called Lillegård <br></br>and is located at <a className="schedule-area__link" href="https://www.google.com/maps/place/Sk%C3%A5ne+l%C3%A4n,+Fredriksrov%C3%A4gen+85,+244+91+K%C3%A4vlinge/@55.8029807,13.2059811,17z/data=!3m1!4b1!4m6!3m5!1s0x4653be3268980521:0xac1f0ba950cb10bc!8m2!3d55.8029807!4d13.2059811!16s%2Fg%2F11c134mm8y?entry=ttu&g_ep=EgoyMDI0MDkwNC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer">85 Fredriksrovägen, Skåne län 244 91, Sweden</a> It’s a cute little farm outside Kävlinge. The closest larger towns are Kävlinge and Eslöv. It is located about 20 minutes from Lund and about 30 minutes from Malmö by car. We recommend that you either drive out or take a train to Elsöv where you can either take a taxi to the venue or coordinate with other guests to rideshare.</h4>
                    </div>

                    <div className="schedule-image">
                        <img className="schedule-image__item" src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).png`} alt="Decorative" />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Schedule;