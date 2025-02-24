import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Hero from "./Hero";
import { Routes, Route, useLocation } from "react-router-dom";
import Schedule from "./pages/Schedule";
import Wedding from "./pages/Wedding-party";
import Rsvp from "./pages/Rsvp";
import Bridalparty from "./pages/Bridalparty";
import Qanda from "./pages/Qanda";

function App() {
    const location = useLocation();
    const [headerVisible, setHeaderVisible] = useState(false); // Default till false
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    const correctPassword = "Daisy"; // Lösenord

    const handlePasswordSubmit = () => {
        if (password === correctPassword) {
            setIsAuthenticated(true);
            sessionStorage.setItem("isAuthenticated", true); // Spara autentisering i sessionStorage
        } else {
            alert("Fel lösenord. Försök igen.");
        }
    };

    // Kolla om användaren redan är autentiserad
    useEffect(() => {
        const sessionAuth = sessionStorage.getItem("isAuthenticated");
        if (sessionAuth) {
            setIsAuthenticated(true);
        }
    }, []);

    // Hantera header visibility baserat på scroll-position
    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 200; // Justera detta värde efter behov
            setHeaderVisible(window.scrollY > scrollThreshold); // Synlig om scroll > threshold
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Kör en gång direkt vid laddning

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Visa lösenordsskydd om användaren inte är autentiserad
    if (!isAuthenticated) {
        return (
            <div className="password-container">
                <div className="password-protect">
                    <h1 className="password-protect__header">Password required</h1>
                    <p className="password-protect__subheader">Enter password to access:</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="password-protect__input"
                    />
                    <button
                        className="password-protect__button"
                        onClick={handlePasswordSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }

    // Rendera resten av appen om användaren är autentiserad
    return (
        <div>
            <Header className={`header ${headerVisible ? "visible" : "hidden"}`} />
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







// import { useState, useEffect } from 'react';
// import './App.css';
// import Header from './Header';
// import Hero from './Hero';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import Schedule from './pages/Schedule';
// import Wedding from './pages/Wedding-party';
// import Rsvp from './pages/Rsvp';
// import Bridalparty from './pages/Bridalparty';
// import Qanda from './pages/Qanda';

// function App() {
//     const location = useLocation();
//     const [headerVisible, setHeaderVisible] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [password, setPassword] = useState("");

//     const correctPassword = "Daisy"; // Byt ut till ditt önskade lösenord

//     const handlePasswordSubmit = () => {
//         if (password === correctPassword) {
//             setIsAuthenticated(true);
//             sessionStorage.setItem("isAuthenticated", true); // Spara autentisering i sessionStorage
//         } else {
//             alert("Fel lösenord. Försök igen.");
//         }
//     };

//     useEffect(() => {
//         const sessionAuth = sessionStorage.getItem("isAuthenticated");
//         if (sessionAuth) {
//             setIsAuthenticated(true);
//         }
//     }, []);

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollPosition = window.scrollY; // Nuvarande scrollposition
//             const heroSecondHeight = 300; // Höjden för hero--second
    
//             if (location.pathname === "/") {
//                 const sessionVisited = sessionStorage.getItem("hasVisited");
    
//                 if (!sessionVisited && scrollPosition < heroSecondHeight) {
//                     setHeaderVisible(false); // Dölj header under hero--second
//                 } else if (scrollPosition >= heroSecondHeight) {
//                     setHeaderVisible(true); // Visa header efter hero--second
//                 }
//             } else {
//                 setHeaderVisible(true); // Visa header på andra sidor
//             }
//         };
    
//         // Initial körning vid sidladdning
//         handleScroll();
//         window.addEventListener("scroll", handleScroll);
    
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, [location.pathname]);
    
    
    

//     // Om användaren inte är autentiserad, visa lösenordsskydd
//     if (!isAuthenticated) {
//         return (
//             <div className='password-container'>
//                 <div className="password-protect">
//                     <h1 className='password-protect__header'>Password required</h1>
//                     <p className='password-protect__subheader'>Enter password to access:</p>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Password"
//                         className='password-protect__input'
//                     />
//                     <button className="password-protect__button" onClick={handlePasswordSubmit}>Submit</button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <Header headerVisible={headerVisible} />
//             <Routes>
//                 <Route path="/" element={<Hero />} />
//                 <Route path="/schedule" element={<Schedule />} />
//                 <Route path="/wedding-party" element={<Wedding />} />
//                 <Route path="/rsvp" element={<Rsvp />} />
//                 <Route path="/bridal-party" element={<Bridalparty />} />
//                 <Route path="/qanda" element={<Qanda />} />
//             </Routes>
//         </div>
//     );
// }

// export default App;