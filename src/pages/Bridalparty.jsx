import React, { useEffect, useRef } from "react";
import './Bridalparty.scss';

function Bridalparty() {
    const bridalpartyRef = useRef(null);

    // Observer för fade-in-effekt
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Sluta observera efter fade-in
                    }
                });
            },
            {
                threshold: 0.1, // 10% av elementet måste vara synligt
            }
        );

        if (bridalpartyRef.current) {
            observer.observe(bridalpartyRef.current);
        }

        return () => {
            if (bridalpartyRef.current) {
                observer.unobserve(bridalpartyRef.current);
            }
        };
    }, []);

    return (
        <>
            <section className="bridalparty">
                <div className="bridalparty-inner" ref={bridalpartyRef}>
                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/Elma-min.JPG`} alt="Elma" loading="lazy" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Alma</h2>
                            <p>Bridesmade, Host</p>
                            <p><a href="mailto:alma.j.tolg@gmail.com">Contact</a></p>
                        </div>
                    </div>

                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/Ella-min.JPG`} alt="Ella" loading="lazy" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Ella</h2>
                            <p>Bridesmade, Host</p>
                            <p><a href="mailto:Ellamarie.karlsson@gmail.com">Contact</a></p>
                        </div>
                    </div>

                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/Jakob-min.JPG`} alt="jakob" loading="lazy" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Jakob</h2>
                            <p>Groomsman, Toastmaster</p>
                            <p><a href="mailto:fransjakob.karlsson@gmail.com">Contact</a></p>
                        </div>
                    </div>

                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/Lukas-min.JPG`} alt="lukas" loading="lazy" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Lukas</h2>
                            <p>Groomsman, Toastmaster</p>
                            <p><a href="mailto:lukas.eriksson98@gmail.com">Contact</a></p>
                        </div>
                    </div>

                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/IMG_3978-min.jpeg`} alt="christoffer" loading="lazy" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Christoffer</h2>
                            <p>Website technician</p>
                            <p><a href="mailto:wallman92@gmail.com">Contact</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Bridalparty;