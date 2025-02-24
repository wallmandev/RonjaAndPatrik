import React, { useState, useEffect } from "react";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
    { path: "/", label: "Home" },
    { path: "/qanda", label: "Q&A" },
    { path: "/schedule", label: "Schedule" },
    { path: "/wedding-party", label: "Venue" },
    { path: "/bridal-party", label: "Bridal Party" },
    { path: "/rsvp", label: "RSVP" },
];

function Header() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [hasScrolledPastThreshold, setHasScrolledPastThreshold] = useState(
        sessionStorage.getItem("hasScrolledPastThreshold") === "true"
    );

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden"; // Förhindra scroll
        } else {
            document.body.style.overflow = "auto"; // Tillåt scroll
        }

        // Återställ till standard när komponenten avmonteras
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const scrollThreshold = 300;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > scrollThreshold && !hasScrolledPastThreshold) {
                setIsHeaderVisible(true);
                setHasScrolledPastThreshold(true); // Markera att man passerat tröskeln
                sessionStorage.setItem("hasScrolledPastThreshold", "true"); // Spara tillstånd
            }

            if (currentScrollY <= scrollThreshold && !hasScrolledPastThreshold) {
                setIsHeaderVisible(false);
            }
        };

        // Kontrollera initial scrollposition vid sidladdning
        if (hasScrolledPastThreshold) {
            setIsHeaderVisible(true);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [hasScrolledPastThreshold]);

    return (
        <section
            className={`header header-wedding ${isHeaderVisible ? "visible" : "hidden"}`}
        >
            <div className="header-inner">
                <div className="header-topic">
                    <h2 className="header-topic__content">Ronja & Patrik</h2>
                </div>
                <div className="header-date">
                    <h3>31 of May 2025</h3>
                </div>
                <nav className="header-nav">
                    <div className="header-hamburger" onClick={toggleMenu}>
                        &#9776; {/* Hamburger-ikon */}
                    </div>
                    <ul className={`header-nav__item ${isMenuOpen ? "hide" : ""}`}>
                        {NAV_ITEMS.map((item, index) => (
                            <li
                                key={index}
                                className={`header-nav__items ${
                                    location.pathname === item.path ? "active" : ""
                                }`}
                            >
                                <Link to={item.path} className="header-nav__links">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className={`header-overlay ${isMenuOpen ? "open" : ""}`}>
                        <button className="header-overlay__close" onClick={toggleMenu}>
                            &#10005; {/* X-ikon */}
                        </button>
                        <ul>
                            <div className="header-nav__flower">
                                <img
                                    src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).png`}
                                    alt="flowers"
                                    className="header-nav__flower-overlay"
                                />
                            </div>
                            {NAV_ITEMS.map((item, index) => (
                                <li key={index} className="header-nav__items">
                                    <Link
                                        to={item.path}
                                        className="header-nav__hamb"
                                        onClick={toggleMenu}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>
        </section>
    );
}

export default Header;

// import React, { useState, useEffect } from 'react';
// import './Header.scss';
// import { Link, useLocation } from 'react-router-dom';

// function Header({ headerVisible }) {
//     console.log("Header component: headerVisible =", headerVisible);
//     const location = useLocation(); // Lyssna på URL-förändringar
//     const [activeIndex, setActiveIndex] = useState(null);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     // Uppdatera aktiv länk baserat på URL
//     useEffect(() => {
//         switch (location.pathname) {
//             case '/':
//                 setActiveIndex(0);
//                 break;
//             case '/qanda':
//                 setActiveIndex(1);
//                 break;
//             case '/schedule':
//                 setActiveIndex(2);
//                 break;
//             case '/wedding-party':
//                 setActiveIndex(3);
//                 break;
//             case '/bridal-party':
//                 setActiveIndex(4);
//                 break;
//             case '/rsvp':
//                 setActiveIndex(6);
//                 break;
//             default:
//                 setActiveIndex(null);
//                 break;
//         }
//     }, [location.pathname]);

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     useEffect(() => {
//         if (isMenuOpen) {
//             document.body.style.overflow = 'hidden'; // Förhindra scroll när menyn är öppen
//         } else {
//             document.body.style.overflow = 'auto'; // Tillåt scroll när menyn är stängd
//         }
//     }, [isMenuOpen]);

//     return (
//         <section className={`header header-wedding ${headerVisible ? "visible" : "hidden"}`}>
//             <div className="header-inner">
//                 <div className="header-topic">
//                     <h2 className="header-topic__content">Ronja & Patrik</h2>
//                 </div>
//                 <div className="header-date">
//                     <h3>31 of May 2025</h3>
//                 </div>
//                 <nav className="header-nav">
//                     <div className="header-hamburger" onClick={toggleMenu}>
//                         &#9776; {/* Hamburger-ikon */}
//                     </div>
//                     <ul className={`header-nav__item ${isMenuOpen ? 'hide' : ''}`}>
//                         <li className={`header-nav__items ${activeIndex === 0 ? 'active' : ''}`}>
//                             <Link to="/" className="header-nav__links">Home</Link>
//                         </li>
//                         <li className={`header-nav__items ${activeIndex === 1 ? 'active' : ''}`}>
//                             <Link to="/qanda" className="header-nav__links">Q&A</Link>
//                         </li>
//                         <li className={`header-nav__items ${activeIndex === 2 ? 'active' : ''}`}>
//                             <Link to="/schedule" className="header-nav__links">Schedule</Link>
//                         </li>
//                         <li className={`header-nav__items ${activeIndex === 3 ? 'active' : ''}`}>
//                             <Link to="/wedding-party" className="header-nav__links">Venue</Link>
//                         </li>
//                         <li className={`header-nav__items ${activeIndex === 4 ? 'active' : ''}`}>
//                             <Link to="/bridal-party" className="header-nav__links">Bridal Party</Link>
//                         </li>
//                         <li className={`header-nav__items ${activeIndex === 6 ? 'active' : ''}`}>
//                             <Link to="/rsvp" className="header-nav__links">RSVP</Link>
//                         </li>
//                     </ul>
//                     <div className={`header-overlay ${isMenuOpen ? 'open' : ''}`}>
//                         <button className="header-overlay__close" onClick={toggleMenu}>
//                             &#10005; {/* X-ikon */}
//                         </button>
//                         <ul>
//                             <div className="header-nav__flower">
//                                 <img src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).png`} alt="flowers" className="header-nav__flower-overlay" />
//                             </div>
//                             <li className="header-nav__items">
//                                 <Link to="/" className="header-nav__hamb" onClick={toggleMenu}>Home</Link>
//                             </li>
//                             <li className="header-nav__items">
//                                 <Link to="/qanda" className="header-nav__hamb" onClick={toggleMenu}>Q&A</Link>
//                             </li>
//                             <li className="header-nav__items">
//                                 <Link to="/schedule" className="header-nav__hamb" onClick={toggleMenu}>Schedule</Link>
//                             </li>
//                             <li className="header-nav__items">
//                                 <Link to="/wedding-party" className="header-nav__hamb" onClick={toggleMenu}>Venue</Link>
//                             </li>
//                             <li className="header-nav__items">
//                                 <Link to="/bridal-party" className="header-nav__hamb" onClick={toggleMenu}>Bridal Party</Link>
//                             </li>
//                             <li className="header-nav__items">
//                                 <Link to="/rsvp" className="header-nav__hamb" onClick={toggleMenu}>RSVP</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </nav>
//             </div>
//         </section>
//     );
// }

// export default Header;