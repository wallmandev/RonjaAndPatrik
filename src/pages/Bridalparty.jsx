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
                        <img src={`${import.meta.env.BASE_URL}images/IMG_3977.jpeg`} alt="alma" loading="lazy" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Alma</h2>
                            <p>Role: Maid of honor</p>
                            <p><a href="mailto:wallman92@gmail.com">Contact</a></p>
                        </div>
                    </div>

                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/IMG_3978.jpeg`} alt="ella" loading="lazy" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Ella</h2>
                            <p>Role: Best Something</p>
                            <p><a href="mailto:wallman92@gmail.com">Contact</a></p>
                        </div>
                    </div>

                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/IMG_3978.jpeg`} alt="jakob" loading="lazy" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Jakob</h2>
                            <p>Role: Best Man</p>
                            <p><a href="mailto:wallman92@gmail.com">Contact</a></p>
                        </div>
                    </div>

                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/IMG_3978.jpeg`} alt="lukas" loading="lazy" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Lukas</h2>
                            <p>Role: Best Something</p>
                            <p><a href="mailto:wallman92@gmail.com">Contact</a></p>
                        </div>
                    </div>

                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/IMG_3978.jpeg`} alt="christoffer" loading="lazy" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Christoffer</h2>
                            <p>Role: Wedding Support</p>
                            <p><a href="mailto:wallman92@gmail.com">Contact</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Bridalparty;