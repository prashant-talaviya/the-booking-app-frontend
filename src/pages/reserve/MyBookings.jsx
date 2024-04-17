
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './mybookings.css';
import Navbar from "../../components/Navbar/Navbar"
import HeaderList from '../../components/headerList/HeaderList';


const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`https://the-booking-app-backend.onrender.com/api/reservation/mybookings?username=${user.username}`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.username]);


    function ArrowRightIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    )
  }
  
  
  function CalendarIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    )
  }
  
  
  function CurrencyIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="8" />
        <line x1="3" x2="6" y1="3" y2="6" />
        <line x1="21" x2="18" y1="3" y2="6" />
        <line x1="3" x2="6" y1="21" y2="18" />
        <line x1="21" x2="18" y1="21" y2="18" />
      </svg>
    )
  }
  
  
  function UsersIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); // Ensures two digits
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // getMonth() is zero-based; ensures two digits
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  const deleteReservation = async (reservationId) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this reservation?");
    if (isConfirmed) {
      try {
        await axios.delete(`https://the-booking-app-backend.onrender.com/api/reservation/${reservationId}`);
        // Filter out the deleted booking from the bookings state
        const updatedBookings = bookings.filter(booking => booking._id !== reservationId);
        setBookings(updatedBookings);
        alert('Your reservation has been cancelled.');
      } catch (error) {
        console.error('Failed to delete reservation:', error);
        alert('Failed to cancel reservation. Please try again.');
      }
    }
  };

  function CrossIcon(props) {
    return (
      <svg
        {...props}
        onClick={props.onClick} // Make sure to pass the onClick prop
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }
  


  return (
    <>
    <Navbar/>
      <HeaderList/>
    <div className="my-bookings">
      
      <center>
        <h2>My Bookings</h2>
        <ul className="booking-list">
          {bookings.map((booking) => (
            <div className="booking-item" key={booking._id}>
              <CrossIcon className="booking-delete-icon" onClick={() => deleteReservation(booking._id)} />
              <div className="booking-info">
                <img
                  alt={booking.hotelName}
                  className="hotel-image"
                  src={booking.hotelPhoto} // Assuming imageUrl exists
                />
                <div>
                  <h2 className="hotel-name">{booking.hotelName}</h2>
                  <div className="date-info">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{((new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24))} nights</span>
           <ArrowRightIcon className="h-5 w-5" />
           <span>{formatDate(booking.checkInDate)}</span>
           <ArrowRightIcon className="h-5 w-5" />
           <span>{formatDate(booking.checkOutDate)}</span>
                  </div>
                  <div className="guest-info">
                  <UsersIcon className="h-5 w-5" />
          <span>Name of Guests: {booking.guestName}</span>
                  </div>
                  <div className="guest-info">
                  
  
                  </div>
                </div>
              </div>
              <div className="price-info">
              <CurrencyIcon className="h-5 w-5" />
     <span className="text-lg font-semibold">Total price: {booking.totalPrice} ₹</span>
   
              </div>
            </div>
          ))}
        </ul>
      </center>
    </div>
    </>
  );
};

export default MyBookings;