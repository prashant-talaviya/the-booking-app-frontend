



import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import '../reserve/mybookings.css'; // Make sure the CSS file exists and is correctly referenced
import Navbar from "../../components/Navbar/Navbar"; // Adjust the import path as necessary
import HeaderList from '../../components/headerList/HeaderList'; // Adjust the import path as necessary

const MyBusBookings = () => {
  const [tickets, setTickets] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Adjust the URL to the correct endpoint for fetching bus tickets by username
    axios.get(`https://the-booking-app-backend.onrender.com/api/buses/tickets-by-username?username=${user.username}`)
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
          <h2>My Bus Tickets</h2>
          <ul className="booking-list">
            {tickets.map((ticket) => (
              ticket.bookedSeats.map((seat, index) => (
                <div className="booking-item" key={index}> {/* Using index as key, consider using a more stable identifier */}
                  <div className="booking-info">
                    <div>
                      <h2 className="bus-name">Bus Name: {ticket.name} </h2>
                      <div className="date-info">
                        <span>Journey date: {formatDate(ticket.date)}</span>
                      </div>
                      <div className="date-info">
                        <span>Timing : {(ticket.time.departure)} &rarr; {(ticket.time.departure)}</span>
                      </div>
                      <div className="date-info">
                        <span>Seat Number: {seat.seatNumber}</span>
                      </div>
                      <div className="date-info">
                        From: {ticket.route.from} &rarr; To: {ticket.route.to}
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

export default MyBusBookings;
