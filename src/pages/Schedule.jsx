import React from "react";
import './Schedule.scss'

function Schedule() {
    return(
        <>
            <div className="container">
                <div className="container-inner">
                    <section className="schedule">
                        <div className="schedule-header">
                            <h1 className="schedule-header__item">Saturday, May 31, 2025</h1>
                        </div>
                        <div className="schedule-subheader">
                            <h2 className="schedule-subheader__item">We are getting married!</h2>
                            <h4 className="schedule-subheader__time">2:00 PM</h4>
                        </div>
                        <div className="schedule-area">
                            <h4 className="schedule-area__adress">Lillegård</h4>
                            <a className="schedule-area__link" href="https://www.google.com/maps/place/Sk%C3%A5ne+l%C3%A4n,+Fredriksrov%C3%A4gen+85,+244+91+K%C3%A4vlinge/@55.8029807,13.2059811,17z/data=!3m1!4b1!4m6!3m5!1s0x4653be3268980521:0xac1f0ba950cb10bc!8m2!3d55.8029807!4d13.2059811!16s%2Fg%2F11c134mm8y?entry=ttu&g_ep=EgoyMDI0MDkwNC4wIKXMDSoASAFQAw%3D%3D" 
                            target="_blank" 
                            rel="noopener noreferrer">85 Fredriksrovägen, Skåne län 244 91, Sweden</a>
                            <div className="schedule-area__cont">
                                <p className="schedule-area__paragraph">Dresscode: something you fell pretty in, we are imagining a garden party. But we are going to be outside, so maybe rethink heels</p>
                            </div>
                        </div>
                        <div className="schedule-image">
                            <img className="schedule-image__item" src={`${import.meta.env.BASE_URL}images/Untitled (500 x 500 px).svg`}></img>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Schedule;