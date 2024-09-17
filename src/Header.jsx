import React, { useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import Schedule from './pages/Schedule';

function Header() {
    // Håll koll på vilken länk som är aktiv
    const [activeIndex, setActiveIndex] = useState(null);
  
    const handleLinkClick = (index) => {
      setActiveIndex(index); // Sätt aktiv länk till indexet för den klickade länken
    };
  
    return (
      <section className="header">
        <div className="header-inner">
            <div className="header-topic">
                <h2 className="header-topic__content">Ronja & Patrik</h2>
            </div>
          <nav className="header-nav">
            <ul className="header-nav__item">
              <li
                className={`header-nav__items ${activeIndex === 0 ? 'active' : ''}`}
                onClick={() => handleLinkClick(0)}
              >
                <Link to="/" className="header-nav__links">Home</Link>
              </li>
              <li
                className={`header-nav__items ${activeIndex === 1 ? 'active' : ''}`}
                onClick={() => handleLinkClick(1)}
              >
                <Link to="/schedule" className="header-nav__links">Schedule</Link>
              </li>
              <li
                className={`header-nav__items ${activeIndex === 3 ? 'active' : ''}`}
                onClick={() => handleLinkClick(3)}
              >
                <Link to="/wedding-party" className="header-nav__links">Wedding Party</Link>
              </li>
              <li
                className={`header-nav__items ${activeIndex === 4 ? 'active' : ''}`}
                onClick={() => handleLinkClick(4)}
              >
                <Link to="/rsvp" className="header-nav__links">RSVP</Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    );
}

export default Header;