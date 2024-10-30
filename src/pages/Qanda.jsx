import React, { useState, useEffect, useRef } from "react";
import './qanda.scss';

function Qanda() {
  // State för att hålla reda på vilken accordion som är öppen
  const [activeIndex, setActiveIndex] = useState(null);

  // Funktion för att toggla synligheten av en accordion
  const toggleAccordion = (index) => {
    // Om den klickade indexen redan är öppen, stäng den
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const accordionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing after fade-in
          }
        });
      },
      {
        threshold: 0.1, // 10% av elementet måste vara synligt
      }
    );

    if (accordionRef.current) {
      observer.observe(accordionRef.current);
    }

    return () => {
      if (accordionRef.current) {
        observer.unobserve(accordionRef.current);
      }
    };
  }, []);



  return (
    <div className="accordion">
        <div className="accordion-inner" ref={accordionRef}>
            <div className="accordion-dateandtime">
                <div className="accordion-dateandtime__header">Time and Date</div>
                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(0)} // Använd index 0 för den första frågan
                    >
                    When is the wedding?
                    </button>
                    <div className={`accordion-content ${activeIndex === 0 ? 'active' : ''}`}>
                    <p>The wedding will take place on 31 of May at 13.30</p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(1)} // Använd index 1 för den andra frågan
                    >
                    When does the ceremony/dinner start?
                    </button>
                    <div className={`accordion-content ${activeIndex === 1 ? 'active' : ''}`}>
                    <p>The ceremony starts at 14.00, and the dinner starts at 17.00.</p>
                    </div>
                </div>
            </div>




            
            <div className="accordion-placeandtravel">
                <div className="accordion-placeandtravel__header">Place And Travel</div>
                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(2)} // Använd index 0 för den första frågan
                    >
                    Where is the wedding?
                    </button>
                    <div className={`accordion-content ${activeIndex === 2 ? 'active' : ''}`}>
                    <p>The wedding will be held at Lillegård, located at <p className="accordion-item__adress">Fredriksrovägen 85, Skåne län 244 91, Sweden.</p></p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(3)} // Använd index 1 för den andra frågan
                    >
                    Is parking available?
                    </button>
                    <div className={`accordion-content ${activeIndex === 3 ? 'active' : ''}`}>
                    <p>Yes, there are parking spaces by the barn, but we encourage carpooling or public transportation if possible.</p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(4)} // Använd index 2 för den tredje frågan
                    >
                    How do I get to the venue?
                    </button>
                    <div className={`accordion-content ${activeIndex === 4 ? 'active' : ''}`}>
                    <p>The venue is easily accessible by car or public transport.</p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(5)} // Använd index 2 för den tredje frågan
                    >
                    Where can i stay overnight?
                    </button>
                    <div className={`accordion-content ${activeIndex === 5 ? 'active' : ''}`}>
                    <p>We don't provide paid stay but there are hotels nearby:<br></br>
                        <a className="accordion-content-hotels" href="https://torgetvandrarhem.se/" target="_blank" rel="noopener noreferrer">Torget Vandrarhem</a><br></br>
                        <a className="accordion-content-hotels" href="https://ligula.se/goodmorninghotels/lund/" target="_blank" rel="noopener noreferrer">Good morning Lund</a>
                    </p>

                    </div>
                </div>

                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(6)}
                    >
                    Is there transportation to and from the venue?
                    </button>
                    <div className={`accordion-content ${activeIndex === 6 ? 'active' : ''}`}>
                    <p>We will not provide any transportation to or from the wedding.</p>
                    </div>
                </div>
            </div>


            <div className="accordion-dresscode">
                <div className="accordion-dresscode__header">Dresscode</div>
                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(7)} // Använd index 0 för den första frågan
                    >
                    What is the dress code?
                    </button>
                    <div className={`accordion-content ${activeIndex === 7 ? 'active' : ''}`}>
                    <p>The dress code is <p className="accordion-item__adress">formal/semi-formal/cocktail.</p> We recommend wearing something comfortable for both the ceremony and the reception.</p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(8)} // Använd index 1 för den andra frågan
                    >
                    Is there a specific theme or color scheme I should follow?
                    </button>
                    <div className={`accordion-content ${activeIndex === 8 ? 'active' : ''}`}>
                    <p>We would appreciate it if you follow our color scheme, which is [colors], but the most important thing is for you to feel comfortable!</p>
                    </div>
                </div>
            </div>

            <div className="accordion-foodanddrink">
                <div className="accordion-foodanddrink__header">Food and Drink</div>
                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(9)} // Använd index 0 för den första frågan
                    >
                    Will there be food served?
                    </button>
                    <div className={`accordion-content ${activeIndex === 9 ? 'active' : ''}`}>
                    <p>Yes, we will serve a three-course dinner. Please let us know about any allergies or dietary restrictions in your RSVP.</p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(10)} // Använd index 1 för den andra frågan
                    >
                    Will there be options for special dietary requirements?
                    </button>
                    <div className={`accordion-content ${activeIndex === 10 ? 'active' : ''}`}>
                    <p>Yes, we will offer vegetarian, vegan, and allergy-friendly options. Please inform us of your dietary needs when you send your RSVP.</p>
                    </div>
                </div>
            </div>


            <div className="accordion-guestinfo">
                <div className="accordion-guestinfo__header">Rsvp and Guest Info</div>
                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(11)} // Använd index 0 för den första frågan
                    >
                    How do I RSVP?
                    </button>
                    <div className={`accordion-content ${activeIndex === 11 ? 'active' : ''}`}>
                    <p>You can easily RSVP by filling out the form on our website under the "RSVP" tab. Please reply by 31 of March.</p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(12)} // Använd index 1 för den andra frågan
                    >
                    Can I bring a guest?
                    </button>
                    <div className={`accordion-content ${activeIndex === 12 ? 'active' : ''}`}>
                    <p>Your invitation is for you and your family members. Please confirm the number when you RSVP.</p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(13)} // Använd index 1 för den andra frågan
                    >
                    Can I bring children?
                    </button>
                    <div className={`accordion-content ${activeIndex === 13 ? 'active' : ''}`}>
                    <p>We love children, and you can bring your child/children until 21.00 after that its kids-free.</p>
                    </div>
                </div>
            </div>

            <div className="accordion-gifts">
                <div className="accordion-gifts__header">Gifts</div>
                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(14)} // Använd index 0 för den första frågan
                    >
                    Where can I send my wedding gift?
                    </button>
                    <div className={`accordion-content ${activeIndex === 14 ? 'active' : ''}`}>
                    <p>If you would like to give us a gift, we have a wedding registry with [store], or you can find a link to our online wedding list at [link]..</p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(15)} // Använd index 1 för den andra frågan
                    >
                    Can we give a cash contribution instead of a physical gift?
                    </button>
                    <div className={`accordion-content ${activeIndex === 15 ? 'active' : ''}`}>
                    <p>We appreciate all gifts, but we would prefer a small contribution towards our honeymoon or future home.</p>
                    </div>
                </div>
            </div>

            <div className="accordion-request">
                <div className="accordion-request__header">Special Requests or Details</div>
                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(16)} // Använd index 0 för den första frågan
                    >
                    Is there anything special I need to know about the wedding?
                    </button>
                    <div className={`accordion-content ${activeIndex === 16 ? 'active' : ''}`}>
                    <p>We ask that you arrive on time, and if you would like to contribute something special during the reception, such as a speech or a surprise, please let us know in advance.</p>
                    </div>
                </div>

                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(17)} // Använd index 1 för den andra frågan
                    >
                    What if I have more questions?
                    </button>
                    <div className={`accordion-content ${activeIndex === 17 ? 'active' : ''}`}>
                    <p>If you have further questions, feel free to contact the person with the Role that you seek in the tab "Bridal Party"</p>
                    </div>
                </div>
                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(18)} // Använd index 1 för den andra frågan
                    >
                    What is the best gift to give if I can't attend?
                    </button>
                    <div className={`accordion-content ${activeIndex === 18 ? 'active' : ''}`}>
                    <p>If you are unable to attend but still wish to give a gift, you can make a contribution towards our honeymoon.</p>
                    </div>
                </div>
            </div>

            <div className="accordion-photography">
                <div className="accordion-photography__header">Photography</div>
                <div className="accordion-item">
                    <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(19)} // Använd index 0 för den första frågan
                    >
                    Is photography allowed during the ceremony?
                    </button>
                    <div className={`accordion-content ${activeIndex === 19 ? 'active' : ''}`}>
                    <p>We will have a professional photographer on-site, so we kindly ask that you refrain from taking pictures during the ceremony. Feel free to take photos during the reception!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Qanda;
