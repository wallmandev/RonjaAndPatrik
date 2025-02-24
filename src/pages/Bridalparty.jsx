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
                    <div className="bridalparty-info">
                        <h1 className="bridalparty-info-header">Meet our bridal party!</h1>
                    </div>
                <div className="bridalparty-inner" ref={bridalpartyRef}>
                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/Elma-min.JPG`} alt="Elma" loading="lazy" rel="preload" as="image" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Alma</h2>
                            <p className="bridalparty-role">Bridesmaid, Host</p>
                            <p><a href="mailto:alma.j.tolg@gmail.com" className="bridalparty-role__contact">Contact</a><br></br>for questions regarding logistics, venue or gifts.</p>
                        </div>
                    </div>

                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/Ella-min.JPG`} alt="Ella" loading="lazy" rel="preload" as="image" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Ella</h2>
                            <p className="bridalparty-role">Bridesmaid, Host</p>
                            <p><a href="mailto:Ellamarie.karlsson@gmail.com" className="bridalparty-role__contact">Contact</a><br></br>for questions regarding logistics, venue or gifts.</p>
                        </div>
                    </div>

                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/Jakob-min.JPG`} alt="Jakob" loading="lazy" rel="preload" as="image" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Jakob</h2>
                            <p className="bridalparty-role">Groomsman, Toastmaster</p>
                            <p><a href="mailto:fransjakob.karlsson@gmail.com" className="bridalparty-role__contact">Contact</a><br></br>for questions regarding speeches or performances.</p>
                        </div>
                    </div>

                    <div className="bridalparty-inner__member">
                        <img src={`${import.meta.env.BASE_URL}images/Lukas-min.JPG`} alt="Lukas" loading="lazy" rel="preload" as="image" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Lukas</h2>
                            <p className="bridalparty-role">Groomsman, Toastmaster</p>
                            <p><a href="mailto:lukas.eriksson98@gmail.com" className="bridalparty-role__contact">Contact</a><br></br>for questions regarding speeches or performances.</p>
                        </div>
                    </div>

                    <div className="bridalparty-inner__member">

                        <img src={`${import.meta.env.BASE_URL}images/PatrikAndRonjaWalk.jpg`} 
                            alt="Patrik&Ronja" 
                            rel="preload" 
                            as="image" 
                            loading="lazy" 
                            className="bridalparty-inner__member-img bridalparty-inner__member-img__ronja">
                        </img>
                        <div className="bridalparty__copyright">
                            <h1 className='bridalparty__photoDenise'>© Denise Sant</h1>
                            <h1 className='bridalparty__photoDeniseInsta'>@denisesant_photography</h1>
                        </div>
                        <div className="bridalparty-inner__member-info">
                            <h2>Ronja & Patrik</h2>
                            <p className="bridalparty-role">Bride and Groom</p>
                            <p><a href="mailto:patrik.ronja@outlook.com" className="bridalparty-role__contact">Contact</a><br></br>for questions regarding guestlist or RSVP</p>
                        </div>

                    </div>

                    <div className="bridalparty-inner__member">

                        <img src={`${import.meta.env.BASE_URL}images/Christoffer-bild.png`} alt="Christoffer" rel="preload" as="image" loading="lazy" className="bridalparty-inner__member-img"></img>
                        <div className="bridalparty-inner__member-info">
                            <h2>Christoffer</h2>
                            <p className="bridalparty-role">Website technician</p>
                            <p><a href="mailto:wallman92@gmail.com" className="bridalparty-role__contact">Contact</a><br></br>for questions regarding the website or technical issues</p>
                        </div>

                    </div>

                </div>
            </section>
        </>
    );
}

export default Bridalparty;