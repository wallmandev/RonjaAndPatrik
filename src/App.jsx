import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Hero from './Hero';
import { Routes, Route, useLocation } from 'react-router-dom';
import Schedule from './pages/Schedule';
import Wedding from './pages/Wedding-party';
import Rsvp from './pages/Rsvp';
import Bridalparty from './pages/Bridalparty';
import Qanda from './pages/Qanda';

function App() {
    const location = useLocation();
    const [headerVisible, setHeaderVisible] = useState(false);
    const [hasScrolledPastSecondHero, setHasScrolledPastSecondHero] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    const correctPassword = "Daisy"; // Byt ut till ditt önskade lösenord

    const handlePasswordSubmit = () => {
        if (password === correctPassword) {
            setIsAuthenticated(true);
            sessionStorage.setItem("isAuthenticated", true); // Spara autentisering i sessionStorage
        } else {
            alert("Fel lösenord. Försök igen.");
        }
    };

    useEffect(() => {
        const sessionAuth = sessionStorage.getItem("isAuthenticated");
        if (sessionAuth) {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const heroSecondHeight = 500; // Justera denna höjd om nödvändigt

            document.body.classList.add('loaded');

            if (location.pathname === "/") {
                const sessionVisited = sessionStorage.getItem("hasVisited");

                if (scrollPosition < heroSecondHeight && !sessionVisited) {
                    setHeaderVisible(false);
                } else {
                    setHeaderVisible(true);
                    setHasScrolledPastSecondHero(true);
                    sessionStorage.setItem("hasVisited", true);
                }
            } else {
                setHeaderVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    if (!isAuthenticated) {
        return (
            <div className='password-container'>
                <div className="password-protect">
                    <h1 className='password-protect__header'>Lösenord krävs</h1>
                    <p className='password-protect__subheader'>Ange lösenord för att komma åt sidan:</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className='password-protect__input'
                    />
                    <button className="password-protect__button" onClick={handlePasswordSubmit}>Skicka</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header headerVisible={headerVisible} />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/wedding-party" element={<Wedding />} />
                <Route path="/rsvp" element={<Rsvp />} />
                <Route path="/bridal-party" element={<Bridalparty />} />
                <Route path="/qanda" element={<Qanda />} />
            </Routes>
        </div>
    );
}

export default App;