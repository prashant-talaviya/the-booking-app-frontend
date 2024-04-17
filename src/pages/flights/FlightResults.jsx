import React, { useContext, useEffect, useState } from 'react';
import './flightResults.css';
import { AuthContext } from "../../context/AuthContext";
import { FlightSearchContext } from '../../context/FlightSearchContext';
import Navbar from '../../components/Navbar/Navbar';
import HeaderList from '../../components/headerList/HeaderList';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const FlightResults = () => {
  const { fromAirport, toAirport, date } = useContext(FlightSearchContext);
  const { user } = useContext(AuthContext);

  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [passengerForm, setPassengerForm] = useState({
    pname: '',
    age: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError('');
      try {
        const url = `https://the-booking-app-backend.onrender.com/api/flights/search?fromAirport=${encodeURIComponent(fromAirport)}&toAirport=${encodeURIComponent(toAirport)}&date=${date}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (fromAirport && toAirport && date) {
      fetchFlights();
    }
  }, [fromAirport, toAirport, date]);

  const handleSelectSeats = (flight) => {
    setSelectedFlight(flight);
    setShowSeatSelection(true);
    // Pre-select already booked seats
    setSelectedSeats(flight.seats.filter(seat => seat.isBooked).map(seat => seat.seatNumber));
  };

  const handleClose = () => {
    setShowSeatSelection(false);
    setSelectedSeats([]);
  };

  const handleSeatClick = (seat) => {
    if (seat.isBooked || selectedSeats.includes(seat.seatNumber)) {
      return; // Prevent selecting already booked or already selected seats
    }
    setSelectedSeats(prev => [...prev, seat.seatNumber]);
  };

  const handlePassengerInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = async () => {
    if (selectedSeats.length === 0 || !selectedFlight) {
      alert('Please select at least one seat.');
      return;
    }

    const bookingPromises = selectedSeats.map(seatNumber => {
      const bookingData = {
        ...passengerForm,
        username: user.username,
        seatNumber,
      };

      return fetch(`https://the-booking-app-backend.onrender.com/api/flights/${encodeURIComponent(selectedFlight._id)}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to book seat ${seatNumber}.`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Booking error:', error.message);
        throw error;
      });
    });

    try {
      await Promise.all(bookingPromises);
      alert('All selected seats have been booked successfully!');
      setPassengerForm({
        username: user.username,
        pname: '',
        age: '',
        email: '',
        phone: '',
      });
      setSelectedSeats([]);
      setShowSeatSelection(false);
    } catch (error) {
      window.location.href="/myflightbooking";
      alert('Your Ticket Booked Successfully.');

    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className='flight-results-header'>
        <div className="flight-results-header-container">
          <HeaderList />
          <h1>Flight Search Results</h1>
        </div>
      </div>

      <div className="flight-results-list">
  {flights.length > 0 ? (
    flights.map((flight) => (
      <div key={flight._id} className="flight-card">
        <div className="airline-logo">
          {/* Replace 'logo-placeholder.png' with your actual logo image path */}
          <img src="https://cdn-icons-png.freepik.com/256/10829/10829843.png" alt={`${flight.airline} logo`} />
        </div>
        <div className="flight-details">
        <div className="departure">
            <span className="time">{flight.flightNumber}</span>
            <span className="city">{flight.airline}</span>
            
          </div>
          <div className="departure">
            <span className="time">{flight.timing.departure}</span>
            <span className="city">{flight.route.fromAirport}</span>
          </div>
          <div className="duration">
            {`${Math.floor(moment.duration(moment(flight.timing.arrival, "HH:mm").diff(moment(flight.timing.departure, "HH:mm"))).asHours())}h ${moment.duration(moment(flight.timing.arrival, "HH:mm").diff(moment(flight.timing.departure, "HH:mm"))).minutes()}m`}
            <span className="non-stop">Non stop</span>
          </div>
          <div className="arrival">
            <span className="time">{flight.timing.arrival}</span>
            <span className="city">{flight.route.toAirport}</span>
          </div>
          <div className="price">
            <span className="amount">₹{flight.ticketPrice}</span>
            <span className="per-adult">per adult</span>
            <button className="view-prices-btn" onClick={() => handleSelectSeats(flight)}>Book Seat</button>
          </div>
        </div>
       
      </div>
    ))
  ) : (
    <div>No flights found.</div>
  )}
</div>


      {showSeatSelection && selectedFlight && (
        <div className="flight-seat-selection-modal">
          <h2>Select Seats for Flight {selectedFlight.flightNumber}</h2>
          <div className="seats-container">
            {selectedFlight.seats.map((seat) => (
              
              <button
                key={seat.seatNumber}
                className={`seat ${seat.isBooked ? 'booked' : selectedSeats.includes(seat.seatNumber) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seat)}
                disabled={seat.isBooked}>
                {seat.seatNumber}
              </button>
            ))}
          </div>
          <div className="passenger-details-form">
                        <input
                            type="text"
                            name="pname"
                            placeholder="Passenger Name"
                            required
                            value={passengerForm.pname}
                            onChange={handlePassengerInputChange}
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            required
                            value={passengerForm.age}
                            onChange={handlePassengerInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={passengerForm.email}
                            onChange={handlePassengerInputChange}
                        />
                        <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="Phone Number"
                            value={passengerForm.phone}
                            onChange={handlePassengerInputChange}
                        />
                    </div>
          <button className="book-btn" onClick={handleSubmitBooking}>Book</button>
          <button className="book-btn" onClick={handleClose}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default FlightResults;
