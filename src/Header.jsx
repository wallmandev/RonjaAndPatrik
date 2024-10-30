import React, { useState, useEffect } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

function Header({ headerVisible }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLinkClick = (index) => {
        setActiveIndex(index);
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';  // Förhindra scroll när menyn är öppen
        } else {
            document.body.style.overflow = 'auto';    // Tillåt scroll när menyn är stängd
        }
    }, [isMenuOpen]);

    return (
        <section className={`header header-wedding ${headerVisible ? 'visible' : 'hidden'}`}>
            <div className="header-inner">
                <div className="header-topic">
                    <h2 className="header-topic__content">Ronja & Patrik</h2>
                </div>
                <div className="header-date">
                    <h3>31 of May 2025</h3>
                </div>
                <nav className="header-nav">
                    <div className="header-hamburger" onClick={toggleMenu}>
                        &#9776;  {/* Hamburger-ikon */}
                    </div>
                    <ul className={`header-nav__item ${isMenuOpen ? 'hide' : ''}`}>
                        <li className={`header-nav__items ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleLinkClick(0)}>
                            <Link to="/" className="header-nav__links">Home</Link>
                        </li>
                        <li className={`header-nav__items ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleLinkClick(1)}>
                            <Link to="/qanda" className="header-nav__links">Q&A</Link>
                        </li>
                        <li className={`header-nav__items ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleLinkClick(2)}>
                            <Link to="/schedule" className="header-nav__links">Schedule</Link>
                        </li>
                        <li className={`header-nav__items ${activeIndex === 3 ? 'active' : ''}`} onClick={() => handleLinkClick(3)}>
                            <Link to="/wedding-party" className="header-nav__links">Venue</Link>
                        </li>
                        <li className={`header-nav__items ${activeIndex === 4 ? 'active' : ''}`} onClick={() => handleLinkClick(4)}>
                            <Link to="/bridal-party" className="header-nav__links">Bridal Party</Link>
                        </li>
                        <li className={`header-nav__items ${activeIndex === 6 ? 'active' : ''}`} onClick={() => handleLinkClick(6)}>
                            <Link to="/rsvp" className="header-nav__links">RSVP</Link>
                        </li>
                    </ul>
                    <div className={`header-overlay ${isMenuOpen ? 'open' : ''}`}>
                        <button className="header-overlay__close" onClick={toggleMenu}>
                            &#10005;  {/* X-ikon */}
                        </button>
                        <ul>
                            <div className="header-nav__flower">
                            <img src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).png`} alt="flowers" className="header-nav__flower-overlay" />
                            </div> 
                            <li className="header-nav__items"><Link to="/" className="header-nav__hamb" onClick={toggleMenu}>Home</Link></li>
                            <li className="header-nav__items"><Link to="/qanda" className="header-nav__hamb" onClick={toggleMenu}>Q&A</Link></li>
                            <li className="header-nav__items"><Link to="/schedule" className="header-nav__hamb" onClick={toggleMenu}>Schedule</Link></li>
                            <li className="header-nav__items"><Link to="/wedding-party" className="header-nav__hamb" onClick={toggleMenu}>Venue</Link></li>
                            <li className="header-nav__items"><Link to="/bridal-party" className="header-nav__hamb" onClick={toggleMenu}>Bridal Party</Link></li>
                            <li className="header-nav__items"><Link to="/rsvp" className="header-nav__hamb" onClick={toggleMenu}>RSVP</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </section>
    );
}

export default Header;





