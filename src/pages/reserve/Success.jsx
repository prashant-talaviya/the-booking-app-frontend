import React from 'react';
import './Success.css'; // Import your CSS for styling
import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="success-container">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={400}
        gravity={0.2}
      />
      <div className="success-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4CAF50"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-check-circle"
        >
    

          <circle cx="12" cy="12" r="10" />
          <path d="M7 13l3 3 7-7" />

        </svg>
        <h1 className='mytext'>Reservation Successful!</h1>
        <p className='mytextpara'>Your reservation has been confirmed.</p>
        <Link to="/mybooking" className="btn">Go to MyBooking</Link>
      </div>
    </div>
  );
};

export default Success;
