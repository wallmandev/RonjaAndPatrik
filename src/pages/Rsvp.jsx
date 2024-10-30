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
  const [notAttending, setNotAttending] = useState(false);  // Nytt state för att hantera när man svarar "Nej"

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

    if (formData.attending === 'Nej') {
      // Om de inte deltar, visa meddelandet om att de inte kommer
      setNotAttending(true);
      setSubmitted(true);  // Detta förhindrar att formdata skickas till Google
    } else {
      // Annars skickar vi data till Google Form
      setSubmitted(true);
      setNotAttending(false); // De deltar, så vi visar tackmeddelandet

      // (Skicka till Google Form - samma som tidigare)
      const googleFormData = new FormData();
      googleFormData.append("entry.2084319408", formData.name); // Namn
      googleFormData.append("entry.1747395762", formData.email); // E-post
      googleFormData.append("entry.616099590", formData.attending); // Deltagande
      // Här kan du fortsätta att lägga till fälten precis som tidigare

      fetch('https://docs.google.com/forms/d/e/1FAIpQLSccC27CO8YHD7BMAP74Sxin6jY0Pg-J3CZAaUjxPxsg5rzHFg/formResponse', {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors',
      })
      .then(() => setSubmitted(true))
      .catch((error) => console.error('Error:', error));
    }
  };

  return (
    <>
      <div className="content-container">
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
                <p>We look forward to seeing you at our wedding!</p>
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

              {/* Visa matpreferenser och familjemedlemmar endast om deltagandet är "Ja" */}
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