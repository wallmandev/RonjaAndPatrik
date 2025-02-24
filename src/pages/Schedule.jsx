import React, { useRef, useEffect } from "react";
import './Wedding.scss'


function Wedding() {
  const eventsRef = useRef([]);

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

    eventsRef.current.forEach(event => {
      if (event) {
        observer.observe(event);
      }
    });

    return () => {
      eventsRef.current.forEach(event => {
        if (event) {
          observer.unobserve(event);
        }
      });
    };
  }, []);

  return (
    <>
      <section className="wedding-party-timeline">
        <div className="wedding-party-timeline__inner">

          <img className="schedule-flower1" src="./images/Untitled (500 x 500 px).png" alt=""/>
          
          <div className="timeline-event right timeline-event-right-bus" ref={el => eventsRef.current[0] = el}>
            <p className="event-time">13:00</p>
            <div className="event-details">
              <div className="event-icon">
                <img className="bus-picture" src="./images/icons8-bus-50.png" alt="Groom Arrival" />
              </div>
              <p className="event-description">Bus from Lund Station</p>
            </div>
          </div>

          <div className="timeline-event left" ref={el => eventsRef.current[1] = el}>
            <p className="event-time">13:30</p>
            <div className="event-details">
              <div className="event-icon">
                <img src="./images/guests.png" alt="Guests Arrival" />
              </div>
              <p className="event-description">Guests Arrival</p>
            </div>
          </div>

          <div className="timeline-event right" ref={el => eventsRef.current[2] = el}>
            <p className="event-time">14:00</p>
            <div className="event-details">
              <div className="event-icon">
                <img src="./images/arch.png" alt="Groom Arrival" />
              </div>
              <p className="event-description">Ceremony starts</p>
            </div>
          </div>

          <div className="timeline-event left" ref={el => eventsRef.current[3] = el}>
            <p className="event-time">14:30</p>
            <div className="event-details">
              <div className="event-icon">
                <img src="./images/dice.png" alt="Bride Arrival" />
              </div>
              <p className="event-description">Garden games</p>
            </div>
          </div>

          <div className="timeline-event right right-food" ref={el => eventsRef.current[4] = el}>
            <p className="event-time">16:30</p>
            <div className="event-details">
              <div className="event-icon">
                <img src="./images/table.png" alt="Find your seat" />
              </div>
              <p className="event-description">Find your seat</p>
            </div>
          </div>

          <div className="schedule-flower2__container">
            <img className="schedule-flower2" src="./images/Untitled (500 x 500 px).png" alt=""/>
          </div>

          <div className="timeline-event left left-dinner" ref={el => eventsRef.current[5] = el}>
            <p className="event-time">17:00</p>
            <div className="event-details">
              <div className="event-icon">
                <img src="./images/serving-dish.png" alt="Dinner" />
              </div>
              <p className="event-description">Dinner</p>
            </div>
          </div>

          <div className="timeline-event right right-cake" ref={el => eventsRef.current[6] = el}>
            <p className="event-time">19:30</p>
            <div className="event-details">
              <div className="event-icon">
                <img src="./images/wedding-cake.png" alt="Cake" />
              </div>
              <p className="event-description">Cake</p>
            </div>
          </div>

          <div className="timeline-event left left-dance" ref={el => eventsRef.current[7] = el}>
            <p className="event-time">20:00</p>
            <div className="event-details">
              <div className="event-icon">
                <img src="./images/dance.png" alt="First Dance" />
              </div>
              <p className="event-description">First dance</p>
            </div>
          </div>

          <div className="timeline-event right right-kids" ref={el => eventsRef.current[8] = el}>
            <p className="event-time">21:00</p>
            <div className="event-details">
              <div className="event-icon">
                <img src="./images/children.png" alt="Kids Free" />
              </div>
              <p className="event-description">No Kids</p>
            </div>
          </div>

          <div className="timeline-event left left-wave" ref={el => eventsRef.current[9] = el}>
            <p className="event-time">00:00</p>
            <div className="event-details">
              <div className="event-icon">
                <img src="./images/just-married.png" alt="Wave us off" />
              </div>
              <p className="event-description">Wave us off</p>
            </div>
          </div>

          <div className="timeline-event right" ref={el => eventsRef.current[10] = el}>
            <p className="event-time">01:00</p>
            <div className="event-details">
              <div className="event-icon">
                <img className="bus-picture" src="./images/icons8-bus-50.png" alt="Groom Arrival" />
              </div>
              <p className="event-description">Bus to Lund Station</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Wedding;