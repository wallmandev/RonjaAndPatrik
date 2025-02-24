import React, { useState, useEffect, useRef } from "react";
import './qanda.scss';

function Qanda() {
  // State för att hålla reda på vilken accordion som är öppen
  const [activeIndex, setActiveIndex] = useState(null);
  const qandaRef = useRef(null);

  // Funktion för att toggla synligheten av en accordion
  const toggleAccordion = (index) => {
    // Om den klickade indexen redan är öppen, stäng den
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
  
    const accordionInner = document.querySelector('.accordion-inner');
    if (accordionInner) {
      observer.observe(accordionInner);
    }
  
    return () => {
      if (accordionInner) {
        observer.unobserve(accordionInner);
      }
    };
  }, []);

  return (
    <div className="qanda-container" ref={qandaRef}>
      <div className="accordion">
        <div className="accordion-inner">
          <div className="accordion-guestinfo">
            <div className="accordion-guestinfo__header">Guest Information</div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(3)}
              >
                How do I RSVP?
              </button>
              <div className={`accordion-content ${activeIndex === 3 ? 'active' : ''}`}>
                <p>You RSVP by filling in the form under the tab “RSVP”, please make sure you fill in the names of everyone you are rsvp-ing for as well as add in any dietary restrictions or allergies.</p>
              </div>
            </div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(4)}
              >
                Can I bring a guest?
              </button>
              <div className={`accordion-content ${activeIndex === 4 ? 'active' : ''}`}>
                <p>Your invitation is for you and your children. If you are unsure if your invitation extends to someone else please ask Ronja or Patrik!</p>
              </div>
            </div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(9)}
              >
                Can I bring my kids?
              </button>
              <div className={`accordion-content ${activeIndex === 9 ? 'active' : ''}`}>
                <p>Yes! We would love to celebrate with your kids! But please note that we have decided to have the wedding kids-free after 21:00.</p>
              </div>
            </div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(10)}
              >
                Are pets allowed?
              </button>
              <div className={`accordion-content ${activeIndex === 10 ? 'active' : ''}`}>
                <p>Although we would love to celebrate with your furry friends, our venue has restrictions against bringing pets since there are other animals at the farm.</p>
              </div>
            </div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(15)} 
              >
                What if I have dietary restrictions?
              </button>
              <div className={`accordion-content ${activeIndex === 15 ? 'active' : ''}`}>
                <p>Please let us know in the RSVP if you have any dietary restrictions</p>
              </div>
            </div>
          </div>

          

          <div className="accordion-placeandtravel">
            <div className="accordion-placeandtravel__header">Place and Travel</div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(1)}
              >
                Where is the wedding?
              </button>
              <div className={`accordion-content ${activeIndex === 1 ? 'active' : ''}`}>
                <p>Our venue is called Lillegård, and is located at Fredriksrovägen 85, 244 91 Kävlinge</p>
              </div>
            </div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(7)}
              >
                How do we get to and from the venue?
              </button>
              <div className={`accordion-content ${activeIndex === 7 ? 'active' : ''}`}>
                <p>We have hired a bus to take you from Lund C to the venue, and back again. The departure times are 13:00 from Lund central station and from the venue at 01.00. Please let us know if you would like to be booked for the bus so we get an estimate on how many people will take it.</p>
              </div>
            </div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(89)}
              >
                Where can I stay overnight?
              </button>
              <div className={`accordion-content ${activeIndex === 89 ? 'active' : ''}`}>
                <p>There are good train connections from Eslöv to both Lund and Malmö so we recommend you find accommodations there or in Eslöv if possible.</p>
              </div>
            </div>
            
          </div>
          <div className="accordion-dateandtime">
            <div className="accordion-dateandtime__header">Time and Date</div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(0)}
              >
                When is the wedding?
              </button>
              <div className={`accordion-content ${activeIndex === 0 ? 'active' : ''}`}>
                <p>The wedding will take place on the 31st of may 2025.</p>
              </div>
            </div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(66)}
              >
                What time does the ceremony start?
              </button>
              <div className={`accordion-content ${activeIndex === 66 ? 'active' : ''}`}>
                <p>The ceremony will start at 14:00. We kindly ask you to arrive from 13:30 and make sure you arrive in good time to find your seats. For a more detailed schedule of the day please visit the tab "Schedule"</p>
              </div>
            </div>
          </div>

          <div className="accordion-dresscode">
            <div className="accordion-dresscode__header">Dresscode</div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(2)}
              >
                What is the dresscode?
              </button>
              <div className={`accordion-content ${activeIndex === 2 ? 'active' : ''}`}>
                <p>We don’t have a specific dresscode but we would love to see some florals. We kindly ask you to not wear white or dark green. Since we are going to be outside a bit and also hope you will join us on the dancefloor we recommend comfortable shoes.</p>
              </div>
            </div>
          </div>
          
          <div className="accordion-photography">
            <div className="accordion-photography__header">Photography</div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(18)}
              >
                Is photography allowed during the reception?
              </button>
              <div className={`accordion-content ${activeIndex === 18 ? 'active' : ''}`}>
                <p>Yes! Feel free to capture the evening and we would love it if you shared your pictures with us throughout the evening!</p>
              </div>
            </div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(19)}
              >
                Is photography allowed during the ceremony?
              </button>
              <div className={`accordion-content ${activeIndex === 19 ? 'active' : ''}`}>
                <p>No. We have hired the lovely Denise Sant to be our wedding photographer and we ask you to allow her to do her job. We will however have a moment during the ceremony where you can take pictures, at any other time we ask that you put away you phone and enjoy this moment with us.</p>
              </div>
            </div>
          </div>

          <div className="accordion-foodanddrink">
            <div className="accordion-foodanddrink__header">Food and Drink</div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(5)}
              >
                Will there be food?
              </button>
              <div className={`accordion-content ${activeIndex === 5 ? 'active' : ''}`}>
                <p>Yes, we will have a pizza buffé and we ask that you let us know about any dietary restrictions or allergies when you RSVP.</p>
              </div>
            </div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(78)}
              >
                Will there be alcohol?
              </button>
              <div className={`accordion-content ${activeIndex === 78 ? 'active' : ''}`}>
                <p>Yes, we will serve some alcohol but please note that since there will be kids attending the wedding until 21:00 there will be no alcohol until after then.</p>
              </div>
            </div>
          </div>

          

          <div className="accordion-gifts">
            <div className="accordion-gifts__header">Gifts</div>
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(6)}
              >
                Wishlist
              </button>
              <div className={`accordion-content ${activeIndex === 6 ? 'active' : ''}`}>
                <p>We appreciate you being here the most but if you would like to give us a gift we would prefer a small contribution to our honeymoon ❤️</p>
              </div>
            </div>
          </div>

          <div className="accordion-request">
            <div className="accordion-request__header">Special Requests</div>

            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(17)}
              >
                Can I bring my own alcohol?
              </button>
              <div className={`accordion-content ${activeIndex === 17 ? 'active' : ''}`}>
                <p>No, we will provide all the alcohol for the event</p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Qanda;