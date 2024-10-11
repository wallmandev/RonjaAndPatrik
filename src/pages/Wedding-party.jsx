import React, { useState, useEffect, useRef } from "react";
import './Schedule.scss';

function Schedule() {
    const images = [
        `${import.meta.env.BASE_URL}images/IMG_1359.jpeg`,
        `${import.meta.env.BASE_URL}images/IMG_3977.jpeg`,
        `${import.meta.env.BASE_URL}images/IMG_3978.jpeg`,
        `${import.meta.env.BASE_URL}images/IMG_3982.jpeg`
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const containerRef = useRef(null);

    // Förladda bilder
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, [images]);

    // Bildbyte och övergångseffekt
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsTransitioning(false);
            }, 500); // Övergångstid matchar CSS
        }, 5000); // Bildbyte var 5:e sekund

        return () => clearInterval(interval);
    }, [images.length]);

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
                threshold: 0.1, // 10% av elementet måste vara synligt
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
                        <img
                            className={`slideshow__image ${isTransitioning ? 'fade-outt' : 'fade-inn'}`}
                            src={images[currentImageIndex]}
                            alt="Slideshow"
                        />
                        <h2 className="image-copyright">Copyright Lillegård</h2>
                    </div>

                    <div className="schedule-subheader">
                        <h2 className="schedule-subheader__item">We are getting married!</h2>
                        <h4 className="schedule-subheader__time">2:00 PM</h4>
                    </div>

                    <div className="schedule-area">
                        <h4 className="schedule-area__adress">Lillegård</h4>
                        <a className="schedule-area__link" href="https://www.google.com/maps/place/Sk%C3%A5ne+l%C3%A4n,+Fredriksrov%C3%A4gen+85,+244+91+K%C3%A4vlinge/@55.8029807,13.2059811,17z/data=!3m1!4b1!4m6!3m5!1s0x4653be3268980521:0xac1f0ba950cb10bc!8m2!3d55.8029807!4d13.2059811!16s%2Fg%2F11c134mm8y?entry=ttu&g_ep=EgoyMDI0MDkwNC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer">85 Fredriksrovägen, Skåne län 244 91, Sweden</a>
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





// import React from "react";
// import './Wedding.scss'

// function Wedding() {
//   return (
//     <>
//       <section className="wedding-party-timeline">
//         <div className="timeline-event left">
//           <p className="event-time">13:30</p>
//           <div className="event-details">
//             <div className="event-icon">
//               <img src="./images/guests.png" alt="Guests Arrival" />
//             </div>
//             <p className="event-description">Guests Arrival</p>
//           </div>
//         </div>

//         <div className="timeline-event right">
//           <p className="event-time">14:00</p>
//           <div className="event-details">
//             <div className="event-icon">
//               <img src="./images/arch.png" alt="Groom Arrival" />
//             </div>
//             <p className="event-description">Ceremony starts</p>
//           </div>
//         </div>

//         <div className="timeline-event left">
//           <p className="event-time">14:30</p>
//           <div className="event-details">
//             <div className="event-icon">
//               <img src="./images/dice.png" alt="Bride Arrival" />
//             </div>
//             <p className="event-description">Garden games</p>
//           </div>
//         </div>

//         <div className="timeline-event right right-food">
//           <p className="event-time">16:30</p>
//           <div className="event-details">
//             <div className="event-icon">
//               <img src="./images/table.png" alt="Bride Arrival" />
//             </div>
//             <p className="event-description">Find your seat</p>
//           </div>
//         </div>

//         <div className="timeline-event left left-dinner">
//           <p className="event-time">17:00</p>
//           <div className="event-details">
//             <div className="event-icon">
//               <img src="./images/serving-dish.png" alt="Bride Arrival" />
//             </div>
//             <p className="event-description">Dinner</p>
//           </div>
//         </div>

//         <div className="timeline-event right right-cake">
//           <p className="event-time">19:30</p>
//           <div className="event-details">
//             <div className="event-icon">
//               <img src="./images/wedding-cake.png" alt="Bride Arrival" />
//             </div>
//             <p className="event-description">Cake</p>
//           </div>
//         </div>

//         <div className="timeline-event left left-dance">
//           <p className="event-time">20:00</p>
//           <div className="event-details">
//             <div className="event-icon">
//               <img src="./images/dance.png" alt="Bride Arrival" />
//             </div>
//             <p className="event-description">First dance</p>
//           </div>
//         </div>

//         <div className="timeline-event right right-kids">
//           <p className="event-time">21:00</p>
//           <div className="event-details">
//             <div className="event-icon">
//               <img src="./images/children.png" alt="Bride Arrival" />
//             </div>
//             <p className="event-description">Kids free</p>
//           </div>
//         </div>

//         <div className="timeline-event left left-wave">
//           <p className="event-time">00:00</p>
//           <div className="event-details">
//             <div className="event-icon">
//               <img src="./images/just-married.png" alt="Bride Arrival" />
//             </div>
//             <p className="event-description">Wave us off</p>
//           </div>
//         </div>

//       </section>
//     </>
//   );
// }

// export default Wedding;