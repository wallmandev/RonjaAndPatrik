import React, { useState } from 'react';
import './Rsvp.scss';

function Rsvp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'Ja',  // Förifyll som "Ja"
    mealPreference: '',  // Huvudpersonens matpreferens
    otherMealPreference: '', // Nytt fält för "Annan" matpreferens
    familyMembers: [{ name: '', mealPreference: '' }],  // Första familjemedlemmen
  });

  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Namn:", formData.name);
    console.log("E-post:", formData.email);
    console.log("Deltagande:", formData.attending);
    console.log("Matpreferens:", formData.mealPreference);

    if (formData.mealPreference === "Övrigt") {
        console.log("Specifik preferens (huvudperson):", formData.otherMealPreference);
    }
  
    const googleFormData = new FormData();
    
    // Huvudpersonens data
    googleFormData.append("entry.2084319408", formData.name); // Huvudpersonens namn
    googleFormData.append("entry.1747395762", formData.email); // Huvudpersonens e-post
    googleFormData.append("entry.616099590", formData.attending); // Huvudpersonens deltagande

    // Kolla om huvudpersonen har valt "Övrigt" och lägg till specifik preferens
    if (formData.mealPreference === "Övrigt") {
        googleFormData.append("entry.1652751970", "__other_option__"); // Indikera att "Övrigt" är vald
        googleFormData.append("entry.1652751970.other_option_response", formData.otherMealPreference); // Specifik preferens
    } else {
        googleFormData.append("entry.1652751970", formData.mealPreference); // Annars, skicka den valda preferensen
    }

    // Familjemedlemmarnas data
    formData.familyMembers.forEach((member, index) => {
      if (index === 0) {
        googleFormData.append("entry.1945137275", member.name); // Familjemedlem 1 namn
        if (member.mealPreference === "Annan") {
            googleFormData.append("entry.1863375011", "__other_option__"); // Familjemedlem 1 väljer "Annan"
            googleFormData.append("entry.1863375011.other_option_response", member.comment); // Specifik preferens för familjemedlem 1
        } else {
            googleFormData.append("entry.1863375011", member.mealPreference); // Annars, skicka den valda preferensen
        }
      }
      if (index === 1) {
        googleFormData.append("entry.781045080", member.name); // Familjemedlem 2 namn
        if (member.mealPreference === "Annan") {
            googleFormData.append("entry.1415458997", "__other_option__"); // Familjemedlem 2 väljer "Annan"
            googleFormData.append("entry.1415458997.other_option_response", member.comment); // Specifik preferens för familjemedlem 2
        } else {
            googleFormData.append("entry.1415458997", member.mealPreference); // Annars, skicka den valda preferensen
        }
      }
      if (index === 2) {
        googleFormData.append("entry.1144492746", member.name); // Familjemedlem 3 namn
        if (member.mealPreference === "Annan") {
            googleFormData.append("entry.1492671261", "__other_option__"); // Familjemedlem 3 väljer "Annan"
            googleFormData.append("entry.1492671261.other_option_response", member.comment); // Specifik preferens för familjemedlem 3
        } else {
            googleFormData.append("entry.1492671261", member.mealPreference); // Annars, skicka den valda preferensen
        }
      }
      if (index === 3) {
        googleFormData.append("entry.1261344490", member.name); // Familjemedlem 4 namn
        if (member.mealPreference === "Annan") {
            googleFormData.append("entry.584561708", "__other_option__"); // Familjemedlem 4 väljer "Annan"
            googleFormData.append("entry.584561708.other_option_response", member.comment); // Specifik preferens för familjemedlem 4
        } else {
            googleFormData.append("entry.584561708", member.mealPreference); // Annars, skicka den valda preferensen
        }
      }
      // Lägg till fler familjemedlemmar om det behövs
    });
  
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSccC27CO8YHD7BMAP74Sxin6jY0Pg-J3CZAaUjxPxsg5rzHFg/formResponse', {
      method: 'POST',
      body: googleFormData,
      mode: 'no-cors',
    })
    .then(() => {
      setSubmitted(true);
    })
    .catch((error) => console.error('Error:', error));
};

  return (

    <>

    <div className="content-container">
        <div className="content-inner">
            <h1 className="content-header">
                We look forward to celebrating our big day with you!
            </h1>
            <p className="content-paragraph"> Please confirm your attendance by <strong>March 31, 2025</strong>, so we can plan everything to perfection. We hope you can join us and make our day even more memorable. Thank you for your response!</p>
        </div>
        <div className="rsvp-form">
        <h1 className="rsvp-form__header">RSVP</h1>
        {submitted ? (
            <div className="thank-you-message">
            <h2>Tack för ditt svar!</h2>
            <p>Vi ser fram emot att se dig på vårt bröllop!</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Namn:</label>
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
                <label htmlFor="email">E-post:</label>
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
                <label htmlFor="attending">Kommer du att delta?</label>
                <select
                    id="attending"
                    name="attending"
                    value={formData.attending}
                    onChange={handleChange}
                    required
                >
                    <option value="Ja">Ja</option>
                    <option value="Nej">Nej</option>
                </select>
                </div>
    
                <div className="form-group">
                <label htmlFor="mealPreference">Matpreferens:</label>
                <select
                    id="mealPreference"
                    name="mealPreference"
                    value={formData.mealPreference}
                    onChange={handleChange}
                    required
                >
                    <option value="">Välj matpreferens</option>
                    <option value="Kött">Kött</option> 
                    <option value="Vegetariskt">Vegetariskt</option> 
                    <option value="Veganskt">Veganskt</option> 
                    <option value="Övrigt">Annan (specificera i text)</option>
                </select>
                </div>
                {/* Visa textrutan om "Annan" väljs */}
            {formData.mealPreference === "Övrigt" && (
                <div className="form-group">
                <label htmlFor="otherMealPreference">Specificera din matpreferens:</label>
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

                <h3 className="form-header">Familjemedlemmar</h3>
                {formData.familyMembers.map((member, index) => (
                <div key={index} className="form-group family-member">
                <label htmlFor={`memberName${index}`}>Namn på familjemedlem:</label>
                <input
                    type="text"
                    id={`memberName${index}`}
                    name="name"
                    value={member.name}
                    onChange={(e) => handleFamilyMemberChange(index, e)}
                    // required
                />
                <label htmlFor={`mealPreference${index}`}>Matpreferens:</label>
                <select
                    id={`mealPreference${index}`}
                    name="mealPreference"
                    value={member.mealPreference}
                    onChange={(e) => handleFamilyMemberChange(index, e)}
                    // required
                >
                    <option value="">Välj matpreferens</option>
                    <option value="Kött">Kött</option>
                    <option value="Vegetariskt">Vegetariskt</option>
                    <option value="Veganskt">Veganskt</option>
                    <option value="Annan">Annan (specificera i kommentarerna)</option>
                </select>

                {member.mealPreference === 'Annan' && (
                    <div className="form-group">
                    <label htmlFor={`comment${index}`}>Specificera matpreferens:</label>
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

                <button type="button" onClick={() => removeFamilyMember(index)}>
                    Ta bort familjemedlem
                </button>
                </div>
            ))}
            <div className="rsvp-buttons">
                <button type="button" onClick={addFamilyMember}>
                    Lägg till familjemedlem
                </button>
        
                <button type="submit">Skicka RSVP</button>
            </div>
            </form>
        )}
        </div>
        </div>

    </>
  );
}

export default Rsvp;