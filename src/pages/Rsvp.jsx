import React, { useState, useEffect, useRef } from 'react';
import './Rsvp.scss';
import JSConfetti from 'js-confetti'

function Rsvp() {
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

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attending: 'Ja',
        mealPreference: '',
        otherMealPreference: '',
        familyMembers: [{ name: '', mealPreference: '' }],
    });

    const jsConfetti = new JSConfetti();

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
            i === index
                ? { ...member, [name]: value }
                : member
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

    const handleSubmit = async (e) => {
        e.preventDefault();
                                                    
            // Sätt status för att visa att formuläret skickats
        setSubmitted(true);
                                                    
        // Konfigurera data för Google Forms
        const googleFormData = new FormData();
                                                    
                                                        // Huvudpersonens data
         googleFormData.append("entry.2084319408", formData.name);
                                                        googleFormData.append("entry.1747395762", formData.email);
                                                        googleFormData.append("entry.616099590", formData.attending);
                                                    
                                                        // Om användaren svarar "Nej"
                                                        if (formData.attending === 'Nej') {
                                                            setNotAttending(true);
                                                    
                                                            // Skicka endast den grundläggande informationen
                                                            fetch('https://docs.google.com/forms/d/e/1FAIpQLSccC27CO8YHD7BMAP74Sxin6jY0Pg-J3CZAaUjxPxsg5rzHFg/formResponse', {
                                                                method: 'POST',
                                                                body: googleFormData,
                                                                mode: 'no-cors', // Google Forms accepterar endast no-cors
                                                            }).catch((error) => console.error('Error:', error));
                                                            return; // Avsluta funktionen här
                                                        }
                                                    
                                                        // Om användaren svarar "Ja"
                                                        await jsConfetti.addConfetti({
                                                            confettiColors: ['#617770'],
                                                            confettiRadius: 6,
                                                            confettiNumber: 100,
                                                        });
                                                    
                                                        // Hantera huvudpersonens matpreferens (inklusive "Annat")
                                                        if (formData.mealPreference === "Övrigt" && formData.otherMealPreference) {
                                                            googleFormData.append("entry.1652751970", "__other_option__");
                                                            googleFormData.append("entry.1652751970.other_option_response", formData.otherMealPreference);
                                                        } else {
                                                            googleFormData.append("entry.1652751970", formData.mealPreference);
                                                        }
                                                    
                                                        // Familjemedlemmarnas data
                                                        const familyFieldMapping = [
                                                            { name: "entry.1945137275", meal: "entry.1863375011" },
                                                            { name: "entry.781045080", meal: "entry.1415458997" },
                                                            { name: "entry.1144492746", meal: "entry.1492671261" },
                                                            { name: "entry.1261344490", meal: "entry.584561708" },
                                                            { name: "entry.649150440", meal: "entry.211423957" },
                                                            { name: "entry.1909382834", meal: "entry.932960668" },
                                                            // Lägg till fler om det behövs
                                                        ];
                                                    
                                                        formData.familyMembers.forEach((member, index) => {
                                                            if (index < familyFieldMapping.length) {
                                                                const { name, meal } = familyFieldMapping[index];
                                                                googleFormData.append(name, member.name);
                                                    
                                                                // Hantera "Annan" för familjemedlemmar
                                                                if (member.mealPreference === "Annan" && member.otherMealPreference) {
                                                                    googleFormData.append(meal, "__other_option__");
                                                                    googleFormData.append(`${meal}.other_option_response`, member.otherMealPreference);
                                                                } else {
                                                                    googleFormData.append(meal, member.mealPreference);
                                                                }
                                                            }
                                                        });
                                                    
                                                        console.log([...googleFormData]);
                                                    
                                                        // Skicka data till Google Forms
                                                        fetch('https://docs.google.com/forms/d/e/1FAIpQLSccC27CO8YHD7BMAP74Sxin6jY0Pg-J3CZAaUjxPxsg5rzHFg/formResponse', {
                                                            method: 'POST',
                                                            body: googleFormData,
                                                            mode: 'no-cors',
                                                        }).catch((error) => console.error('Error:', error));
                                                    };
                                                    
    

    useEffect(() => {
        if (submitted && !notAttending) {
            console.log("Thank you for attending!"); // För felsökning
        }
    }, [submitted, notAttending]);

    return (
        <>
            <div className="content-container">
                <h1 className='rsvp-form__photoDenise'>© Denise Sant</h1>
                <h1 className='rsvp-form__photoDeniseInsta'>@denisesant_photography</h1>
                <div className="rsvp-form__photo"></div>
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
                                <p>We look forward to seeing you at our wedding <strong>May 31, 2025!</strong></p>
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

                                        {member.mealPreference === "Annan" && (
                                            <div className="form-group">
                                                <label htmlFor={`otherMealPreference${index}`}>Specify food preference:</label>
                                                <textarea
                                                    id={`otherMealPreference${index}`}
                                                    name="otherMealPreference"
                                                    value={member.otherMealPreference || ''}
                                                    onChange={(e) => handleFamilyMemberChange(index, e)}
                                                    rows="3"
                                                    placeholder="Write your food preference here"
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