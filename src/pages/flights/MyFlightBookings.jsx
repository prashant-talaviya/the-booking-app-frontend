




import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import '../reserve/mybookings.css'; // Make sure the CSS file exists and is correctly referenced
import Navbar from "../../components/Navbar/Navbar"; // Adjust the import path as necessary
import HeaderList from '../../components/headerList/HeaderList'; // Adjust the import path as necessary

const MyFlightBookings = () => {
  const [tickets, setTickets] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Adjust the URL to the correct endpoint for fetching bus tickets by username
    axios.get(`https://the-booking-app-backend.onrender.com/api/flights/tickets-by-username?username=${user.username}`)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.username]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Navbar />
      <HeaderList />
      <div className="my-bookings">
        <center>
          <h2>My Flight Tickets</h2>
          <ul className="booking-list">
            {tickets.map((ticket) => (
              ticket.bookedSeats.map((seat, index) => (
                <div className="booking-item" key={index}> {/* Using index as key, consider using a more stable identifier */}
                  <div className="booking-info">
                    <img src="https://st5.depositphotos.com/65056482/64560/i/450/depositphotos_645600946-stock-photo-airmail-delivery-parcels-air-icon.jpg" alt="flight" width={200} />
                    <div>
                      <h2 className="bus-name">Flight Number: {ticket.name} </h2>
                      <div className="date-info">
                        <span>Journey date: {formatDate(ticket.date)}</span>
                      </div>
                      <div className="date-info">
                        <span>Timing : {(ticket.timing.departure)} &rarr; {(ticket.timing.arrival)}</span>
                      </div>
                      <div className="date-info">
                        <span>Seat Number: {seat.seatNumber}</span>
                      </div>
                      <div className="date-info">
                        From: {ticket.route.fromAirport} &rarr; To: {ticket.route.toAirport}
                      </div>
                      <div className="date-info">
                      Passenger Name: {seat.pname} 
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ))}
          </ul>
        </center>
      </div>
    </>
  );
};

export default MyFlightBookings;




