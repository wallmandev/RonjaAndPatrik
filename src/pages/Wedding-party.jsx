import React from "react";
import './Wedding.scss'

function Wedding() {
  return (
    <>
      <section className="wedding-party-timeline">
        <div className="timeline-event left">
          <p className="event-time">13:30</p>
          <div className="event-details">
            <div className="event-icon">
              <img src="./public/images/guests.svg" alt="Guests Arrival" />
            </div>
            <p className="event-description">Guests Arrival</p>
          </div>
        </div>

        <div className="timeline-event right">
          <p className="event-time">14:00</p>
          <div className="event-details">
            <div className="event-icon">
              <img src="./public/images/arch.png" alt="Groom Arrival" />
            </div>
            <p className="event-description">Ceremony starts</p>
          </div>
        </div>

        <div className="timeline-event left">
          <p className="event-time">14:30</p>
          <div className="event-details">
            <div className="event-icon">
              <img src="./public/images/dice.png" alt="Bride Arrival" />
            </div>
            <p className="event-description">Garden games</p>
          </div>
        </div>

        <div className="timeline-event right right-food">
          <p className="event-time">16:30</p>
          <div className="event-details">
            <div className="event-icon">
              <img src="./public/images/table.png" alt="Bride Arrival" />
            </div>
            <p className="event-description">Find your seat</p>
          </div>
        </div>

        <div className="timeline-event left left-dinner">
          <p className="event-time">17:00</p>
          <div className="event-details">
            <div className="event-icon">
              <img src="./public/images/serving-dish.png" alt="Bride Arrival" />
            </div>
            <p className="event-description">Dinner</p>
          </div>
        </div>

        <div className="timeline-event right right-cake">
          <p className="event-time">19:30</p>
          <div className="event-details">
            <div className="event-icon">
              <img src="./public/images/wedding-cake.png" alt="Bride Arrival" />
            </div>
            <p className="event-description">Cake</p>
          </div>
        </div>

        <div className="timeline-event left left-dance">
          <p className="event-time">20:00</p>
          <div className="event-details">
            <div className="event-icon">
              <img src="./public/images/dance.png" alt="Bride Arrival" />
            </div>
            <p className="event-description">First dance</p>
          </div>
        </div>

        <div className="timeline-event right right-kids">
          <p className="event-time">19:30</p>
          <div className="event-details">
            <div className="event-icon">
              <img src="./public/images/children.png" alt="Bride Arrival" />
            </div>
            <p className="event-description">Kids free</p>
          </div>
        </div>

        <div className="timeline-event left left-wave">
          <p className="event-time">00:00</p>
          <div className="event-details">
            <div className="event-icon">
              <img src="./public/images/just-married.png" alt="Bride Arrival" />
            </div>
            <p className="event-description">Wave us off</p>
          </div>
        </div>

      </section>
    </>
  );
}

export default Wedding;

// import React from "react"
// import './Wedding.scss'

// function wedding(){
//     return(
//     <>

//         <section className="wedding-party-timeline">
//         <div className="timeline-event">
//             <p className="event-time">7:00 PM</p>
//             <div className="event-details">
//             <div class="event-icon"><img src="./public/images/groom.svg" alt="Groom Arrival"></img></div>
//             <p className="event-description">Groom Arrival</p>
//             </div>
//         </div>

//         <div className="timeline-event">
//             <p className="event-time">7:15 PM</p>
//             <div className="event-details">
//             {/* <div class="event-icon"><img src="bride-icon.svg" alt="Bride Arrival"></div> */}
//             <p className="event-description">Bride Arrival</p>
//             </div>
//         </div>

//         <div className="timeline-event">
//             <p className="event-time">8:00 PM</p>
//             <div className="event-details">
//             {/* <div class="event-icon"><img src="dinner-icon.svg" alt="Dinner"></div> */}
//             <p className="event-description">Buffet Dinner</p>
//             </div>
//         </div>
//         </section>
//     </>
//     )
// }

// export default wedding;