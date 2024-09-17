import React, { useState, useEffect } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

function Header() {
    // Håll koll på vilken länk som är aktiv
    const [activeIndex, setActiveIndex] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Hantera hamburgarmenyns öppna/stängda status

    const handleLinkClick = (index) => {
      setActiveIndex(index); // Sätt aktiv länk till indexet för den klickade länken
      setIsMenuOpen(false); // Stäng hamburgarmenyn när en länk klickas
    };

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen); // Växla mellan öppet och stängt för hamburgarmenyn
    };

    // Förhindra scrollning när menyn är öppen
    useEffect(() => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }, [isMenuOpen]);

    return (
      <section className="header">
        <div className="header-inner">
            <div className="header-topic">
                <h2 className="header-topic__content">Ronja & Patrik</h2>
            </div>
            <nav className="header-nav">
              <div className="header-hamburger" onClick={toggleMenu}>
                &#9776;  {/* Hamburger-ikon */}
              </div>
              <ul className={`header-nav__item ${isMenuOpen ? 'hide' : ''}`}> {/* Korrekt klassnamn för den vanliga menyn */}
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
                  className={`header-nav__items ${activeIndex === 2 ? 'active' : ''}`}
                  onClick={() => handleLinkClick(2)}
                >
                  <Link to="/wedding-party" className="header-nav__links">Wedding Party</Link>
                </li>
                <li
                  className={`header-nav__items ${activeIndex === 3 ? 'active' : ''}`}
                  onClick={() => handleLinkClick(3)}
                >
                  <Link to="/rsvp" className="header-nav__links">RSVP</Link>
                </li>
              </ul>
              <div className={`header-overlay ${isMenuOpen ? 'open' : ''}`}>
                <button className="header-overlay__close" onClick={toggleMenu}>
                  &#10005;  {/* X-ikon */}
                </button>
                <ul>
                  <li className="header-nav__items"><Link to="/" onClick={toggleMenu}>Home</Link></li>
                  <li className="header-nav__items"><Link to="/schedule" onClick={toggleMenu}>Schedule</Link></li>
                  <li className="header-nav__items"><Link to="/wedding-party" onClick={toggleMenu}>Wedding Party</Link></li>
                  <li className="header-nav__items"><Link to="/rsvp" onClick={toggleMenu}>RSVP</Link></li>
                </ul>
              </div>
            </nav>
        </div>
      </section>
    );
}

export default Header;

// import React, { useState } from 'react';
// import './Header.scss';
// import { Link } from 'react-router-dom';

// function Header() {
//     // Håll koll på vilken länk som är aktiv
//     const [activeIndex, setActiveIndex] = useState(null);
//     const [isMenuOpen, setIsMenuOpen] = useState(false); // Hantera hamburgarmenyns öppna/stängda status
  
//     const handleLinkClick = (index) => {
//       setActiveIndex(index); // Sätt aktiv länk till indexet för den klickade länken
//       setIsMenuOpen(false); // Stäng hamburgarmenyn när en länk klickas
//     };

//     const toggleMenu = () => {
//       setIsMenuOpen(!isMenuOpen); // Växla mellan öppet och stängt för hamburgarmenyn
//     };
  
//     return (
//       <section className="header">
//         <div className="header-inner">
//             <div className="header-topic">
//                 <h2 className="header-topic__content">Ronja & Patrik</h2>
//             </div>
//           <nav className="header-nav">
//             <div className="header-hamburger" onClick={toggleMenu}>
//               &#9776;  {/* Hamburger-ikon */}
//             </div>
//             <div className={`header-overlay ${isMenuOpen ? 'open' : ''}`}>
//               <ul>
//                 <li
//                   className={`header-nav__items ${activeIndex === 0 ? 'active' : ''}`}
//                   onClick={() => handleLinkClick(0)}
//                 >
//                   <Link to="/" className="header-nav__links">Home</Link>
//                 </li>
//                 <li
//                   className={`header-nav__items ${activeIndex === 1 ? 'active' : ''}`}
//                   onClick={() => handleLinkClick(1)}
//                 >
//                   <Link to="/schedule" className="header-nav__links">Schedule</Link>
//                 </li>
//                 <li
//                   className={`header-nav__items ${activeIndex === 2 ? 'active' : ''}`}
//                   onClick={() => handleLinkClick(2)}
//                 >
//                   <Link to="/wedding-party" className="header-nav__links">Wedding Party</Link>
//                 </li>
//                 <li
//                   className={`header-nav__items ${activeIndex === 3 ? 'active' : ''}`}
//                   onClick={() => handleLinkClick(3)}
//                 >
//                   <Link to="/rsvp" className="header-nav__links">RSVP</Link>
//                 </li>
//               </ul>
//             </div>
//           </nav>
//         </div>
//       </section>
//     );
// }

// export default Header;

// import React, { useState } from 'react';
// import './Header.scss';
// import { Link } from 'react-router-dom';
// import Schedule from './pages/Schedule';

// function Header() {
//     // Håll koll på vilken länk som är aktiv
//     const [activeIndex, setActiveIndex] = useState(null);
  
//     const handleLinkClick = (index) => {
//       setActiveIndex(index); // Sätt aktiv länk till indexet för den klickade länken
//     };
  
//     return (
//       <section className="header">
//         <div className="header-inner">
//             <div className="header-topic">
//                 <h2 className="header-topic__content">Ronja & Patrik</h2>
//             </div>
//           <nav className="header-nav">
//             <ul className="header-nav__item">
//               <li
//                 className={`header-nav__items ${activeIndex === 0 ? 'active' : ''}`}
//                 onClick={() => handleLinkClick(0)}
//               >
//                 <Link to="/" className="header-nav__links">Home</Link>
//               </li>
//               <li
//                 className={`header-nav__items ${activeIndex === 1 ? 'active' : ''}`}
//                 onClick={() => handleLinkClick(1)}
//               >
//                 <Link to="/schedule" className="header-nav__links">Schedule</Link>
//               </li>
//               <li
//                 className={`header-nav__items ${activeIndex === 3 ? 'active' : ''}`}
//                 onClick={() => handleLinkClick(3)}
//               >
//                 <Link to="/wedding-party" className="header-nav__links">Wedding Party</Link>
//               </li>
//               <li
//                 className={`header-nav__items ${activeIndex === 4 ? 'active' : ''}`}
//                 onClick={() => handleLinkClick(4)}
//               >
//                 <Link to="/rsvp" className="header-nav__links">RSVP</Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </section>
//     );
// }

// export default Header;