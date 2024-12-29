import React, { useState, useEffect, useRef } from 'react';
import './Rsvp.scss';
import { Fireworks } from 'fireworks-js';

function Rsvp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attending: 'Ja',
        mealPreference: '',
        otherMealPreference: '',
        familyMembers: [{ name: '', mealPreference: '' }],
    });

    const [submitted, setSubmitted] = useState(false);
    const [notAttending, setNotAttending] = useState(false);
    const fireworksRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFamilyMemberChange = (index, event) => {
        const { name, value } = event.target;
        const updatedMembers = formData.familyMembers.map((member, i) =>
            i === index ? { ...member, [name]: value } : member
        );
        setFormData({ ...formData, familyMembers: updatedMembers });
    };

    const addFamilyMember = () => {
        setFormData({
            ...formData,
            familyMembers: [...formData.familyMembers, { name: '', mealPreference: '' }],
        });
    };

    const removeFamilyMember = (index) => {
        const updatedMembers = formData.familyMembers.filter((_, i) => i !== index);
        setFormData({ ...formData, familyMembers: updatedMembers });
    };

    const triggerFireworks = () => {
        const fireworks = new Fireworks(fireworksRef.current, {
            speed: 3,
            acceleration: 1.05,
            friction: 0.98,
            gravity: 1.5,
            particles: 100,
            trace: 3,
            explosion: 5,
            intensity: 30,
            hue: { min: 133, max: 133 },
            opacity: 0.8, // Start med en viss opacitet
            decay: { min: 0.015, max: 0.1 }, // Gradvis försvinnande av fyrverkeripartiklar
            lineStyle: 'round',
            brightness: { min: 50, max: 80 },
            delay: { min: 30, max: 60 },
            rocketsPoint: { min: 50, max: 50 },
            lineWidth: {
                explosion: { min: 1, max: 3 },
                trace: { min: 1, max: 2 },
            },
        });

        fireworks.start();

        // Stoppa fyrverkerier efter 5 sekunder
        setTimeout(() => {
            fireworks.stop();
        }, 5000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.attending === 'Nej') {
            setNotAttending(true);
            setSubmitted(true);
        } else {
            setSubmitted(true);
            triggerFireworks(); // Aktivera fyrverkerier när formuläret skickas

            const googleFormData = new FormData();
            googleFormData.append("entry.2084319408", formData.name);
            googleFormData.append("entry.1747395762", formData.email);
            googleFormData.append("entry.616099590", formData.attending);

            fetch('https://docs.google.com/forms/d/e/1FAIpQLSccC27CO8YHD7BMAP74Sxin6jY0Pg-J3CZAaUjxPxsg5rzHFg/formResponse', {
                method: 'POST',
                body: googleFormData,
                mode: 'no-cors',
            }).catch((error) => console.error('Error:', error));
        }
    };

    useEffect(() => {
        if (submitted && !notAttending) {
            console.log("Thank you for attending!"); // För felsökning
        }
    }, [submitted, notAttending]);

    return (
        <>
            <div className="content-container">
                <div ref={fireworksRef} className="fireworks-container"></div>
                <div className="content-inner">
                    <h1 className="content-header">
                        We look forward to celebrating our big day with you!
                    </h1>
                    <p className="content-paragraph">
                        Please confirm your attendance by <strong>March 31, 2025</strong>, so we can plan everything to perfection. We hope you can join us and make our day even more memorable. Thank you for your response!
                    </p>
                </div>
                <div className="rsvp-form">
                    <h1 className="rsvp-form__header">RSVP</h1>

                    {submitted ? (
                        notAttending ? (
                            <div className="thank-you__message-no">
                                <h2>We appreciate you letting us know. It's unfortunate that you can’t attend, but we understand and hope to share photos and memories with you later.</h2>
                            </div>
                        ) : (
                            <div className="thank-you-message">
                                <h2>Thank you for your response!</h2>
                                <p>We look forward to seeing you at our wedding <strong>March 31, 2025!</strong></p>
                            </div>
                        )
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="attending">Will you attend?</label>
                                <select
                                    id="attending"
                                    name="attending"
                                    value={formData.attending}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Ja">Yes</option>
                                    <option value="Nej">No</option>
                                </select>
                            </div>

                            {formData.attending === "Ja" && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="mealPreference">Food preference:</label>
                                        <select
                                            id="mealPreference"
                                            name="mealPreference"
                                            value={formData.mealPreference}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Choose food preference</option>
                                            <option value="Kött">Meat</option>
                                            <option value="Vegetariskt">Vegetarian</option>
                                            <option value="Veganskt">Vegan</option>
                                            <option value="Övrigt">Other (specify in text)</option>
                                        </select>
                                    </div>

                                    {formData.mealPreference === "Övrigt" && (
                                        <div className="form-group">
                                            <label htmlFor="otherMealPreference">Specify your food preference:</label>
                                            <input
                                                type="text"
                                                id="otherMealPreference"
                                                name="otherMealPreference"
                                                value={formData.otherMealPreference}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    )}

                                    <h3 className="form-header">Family members</h3>
                                    {formData.familyMembers.map((member, index) => (
                                        <div key={index} className="form-group family-member">
                                            <label htmlFor={`memberName${index}`}>Name on family member:</label>
                                            <input
                                                type="text"
                                                id={`memberName${index}`}
                                                name="name"
                                                value={member.name}
                                                onChange={(e) => handleFamilyMemberChange(index, e)}
                                            />
                                            <label htmlFor={`mealPreference${index}`}>Food preference:</label>
                                            <select
                                                id={`mealPreference${index}`}
                                                name="mealPreference"
                                                value={member.mealPreference}
                                                onChange={(e) => handleFamilyMemberChange(index, e)}
                                            >
                                                <option value="">Choose food preference</option>
                                                <option value="Kött">Meat</option>
                                                <option value="Vegetariskt">Vegetarian</option>
                                                <option value="Veganskt">Vegan</option>
                                                <option value="Annan">Other (specify in text)</option>
                                            </select>

                                            {member.mealPreference === 'Annan' && (
                                                <div className="form-group">
                                                    <label htmlFor={`comment${index}`}>Specify food preference:</label>
                                                    <textarea
                                                        id={`comment${index}`}
                                                        name="comment"
                                                        value={member.comment}
                                                        onChange={(e) => handleFamilyMemberChange(index, e)}
                                                        rows="3"
                                                        placeholder="Skriv din matpreferens här"
                                                    />
                                                </div>
                                            )}
                                            <div className="buttons-bottom">
                                                <button type="button" onClick={addFamilyMember}>
                                                    Add Family member
                                                </button>
                                                <button type="button" onClick={() => removeFamilyMember(index)}>
                                                    Remove Family member
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}

                            <div className="rsvp-buttons">
                                <button className="form-submit__button" type="submit">Send RSVP</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}

export default Rsvp;