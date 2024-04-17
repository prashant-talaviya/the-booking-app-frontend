


import React, { useState } from "react";
import "./ReservationForm.css";

const ReservationForm = ({ handleReservation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    cvv: '',
    expiry: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 2) {
      handleReservation(formData);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="reservation-container">
      <div className="reservation-form-header">
        <h2>Make Your Reservation</h2>
      </div>
      <form onSubmit={handleSubmit} className="reservation-form">
        {step === 1 && (
          <>
            <div className="input-group">
              <label>Guest Name:</label>
              <input
                type="text"
                name="name"
                className="custom-input"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                className="custom-input"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Phone No:</label>
              <input
                type="tel"
                name="phone"
                className="custom-input"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" onClick={() => setStep(2)} className="submit-btn">Next</button>
          </>
        )}

        {step === 2 && (
          <>
         
            <div className="input-group">
              <label>Card Name:</label>
              <input
                type="text"
                name="cardName"
                className="custom-input"
                value={formData.cardName}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                className="custom-input"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>CVV:</label>
              <input
                type="text"
                name="cvv"
                className="custom-input"
                value={formData.cvv}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Expiry:</label>
              <input
                type="text"
                name="expiry"
                className="custom-input"
                value={formData.expiry}
                onChange={handleInputChange}
              />
            </div>
            
            <button type="button" onClick={() => setStep(1)} className="submit-btn">Previous</button>
          
            <button type="submit" className="submit-btn">Confirm Reservation</button>
           
          </>
        )}
      </form>
    </div>
  );
};

export default ReservationForm;
