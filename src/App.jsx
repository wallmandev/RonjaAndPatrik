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

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const heroSecondHeight = 500;  // Justera denna höjd om nödvändigt

            document.body.classList.add('loaded');
            

            // Kontrollera om vi är på startsidan ("/")
            if (location.pathname === "/") {
                const sessionVisited = sessionStorage.getItem("hasVisited");

                // Om vi är under hero--second och användaren inte har scrollat förbi tidigare, dölja headern
                if (scrollPosition < heroSecondHeight && !sessionVisited) {
                    setHeaderVisible(false);
                } else {
                    // När vi har scrollat förbi hero--second eller om användaren redan har besökt startsidan
                    setHeaderVisible(true);
                    setHasScrolledPastSecondHero(true);
                    sessionStorage.setItem("hasVisited", true); // Markera att användaren har scrollat förbi hero--second
                }
            } else {
                // På alla andra sidor ska headern alltid vara synlig
                setHeaderVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    useEffect(() => {
        // Kontrollera om användaren har besökt startsidan tidigare (baserat på sessionStorage)
        const sessionVisited = sessionStorage.getItem("hasVisited");

        // Om vi navigerar tillbaka till startsidan och har passerat hero--second, visa headern direkt
        if (location.pathname === "/" && sessionVisited) {
            setHeaderVisible(true);
        }

        // Om vi går till en annan flik ska headern alltid vara synlig
        if (location.pathname !== "/") {
            setHeaderVisible(true);  
        }
    }, [location.pathname]);

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
//     const [hasScrolledPastSecondHero, setHasScrolledPastSecondHero] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollPosition = window.scrollY;
//             const heroSecondHeight = 500;  // Justera denna höjd om nödvändigt

//             // Kontrollera om vi är på startsidan ("/")
//             if (location.pathname === "/") {
//                 // Om vi är under hero--second, dölja headern
//                 if (scrollPosition < heroSecondHeight) {
//                     setHeaderVisible(false);
//                 } else {
//                     // När vi har scrollat förbi hero--second, visa headern
//                     setHeaderVisible(true);
//                     setHasScrolledPastSecondHero(true);
//                 }
//             } else {
//                 // På alla andra sidor ska headern alltid vara synlig
//                 setHeaderVisible(true);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, [location.pathname]);

//     useEffect(() => {
//         // Se till att headern alltid visas om vi har passerat hero--second och byter flik
//         if (location.pathname === "/" && hasScrolledPastSecondHero) {
//             setHeaderVisible(true);
//         }

//         if (location.pathname !== "/") {
//             setHeaderVisible(true);  // På andra sidor ska headern alltid vara synlig
//         }
//     }, [location.pathname, hasScrolledPastSecondHero]);

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



