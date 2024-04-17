
   
import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import "./hotel.css";
import HeaderList from "../../components/headerList/HeaderList";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Hotel = () => {

  const [expiryDate, setExpiryDate] = useState('');





  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);


  const { dates } = useContext(SearchContext);
  
  // Initialize days with zero and calculate properly later
  const [days, setDays] = useState(1);

  const getDefaultDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return { today: today.toISOString().split('T')[0], tomorrow: tomorrow.toISOString().split('T')[0] };
  };

  const { today, tomorrow } = getDefaultDates();
  
  const [formData, setFormData] = useState({
    guestname: '',
    email: '',
    phone: '',
    cardnumber: '',
    expiryDate: '', // Managed together for simplicity
    cvv: '',
    checkIn: today, // Default to today
    checkOut: tomorrow, // Default to today
    rooms: 1,
    guests: 1,
    roomType: '1 King Bed Standard Non Smoking',
  });

  const todayFormatted = new Date().toISOString().split("T")[0];


  useEffect(() => {
    const startDate = new Date(formData.checkIn);
    const endDate = new Date(formData.checkOut);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, [formData.checkIn, formData.checkOut]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If the user is trying to select the same day for check-in and check-out, show an alert
    if ((name === "checkIn" && value === formData.checkOut) || (name === "checkOut" && value === formData.checkIn)) {
      toast("Check-in and check-out dates cannot be the same.");
      return;
    }
  
    // Rest of your validation logic for check-in being in the past or check-out before check-in
    const newValue = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (name === "checkIn" && newValue < today) {
      toast("Check-in date cannot be in the past.");
      return;
    }
  
    if (name === "checkOut" && newValue <= new Date(formData.checkIn)) {
      toast("Check-out date must be after check-in date.");
      return;
    }
  
    // Update form data if all validations pass
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const [step, setStep] = useState(1); // State to manage current step




  const handleExpiryDateChange = (e) => {
    let { value } = e.target;
  
    // Remove all non-digits and limit string to 4 characters
    value = value.replace(/\D/g, '').substring(0, 4);
  
    // Insert slash after 2 digits if the length is more than 2
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
  
    setExpiryDate(value);
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      // If the user is not logged in, display an alert
      alert("Please log in first to make a reservation.");
      // Optionally, redirect the user to the login page
      navigate("/login");
      return;
    }
  
  
    if (step === 1) {
      // Proceed to the next step in the form.
      setStep(step + 1);
    } else {
      // Construct the form data to be sent to the API.
      const reservationData = {
        username: user.username, // Get the username from the context and include it in the reservation data
        hotelName: data.name,
        hotelAddress: data.address,
        hotelPhoto: data.photos[0], // First photo from the array
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        totalPrice: totalPrice.toString(), // Ensure this is a string if your API expects a string
        reservationRooms: formData.rooms.toString(), // Ensure this is a string
        guestNumber: formData.guests.toString(), // Ensure this is a string
        roomType: formData.roomType,
        guestName: formData.guestname,
        email: formData.email,
        phone: formData.phone,
        cardNumber: formData.cardnumber,
        expiryDate: expiryDate,
        cvv: formData.cvv
      };
  
      // API request to send the form data.
      try {
        const response = await fetch("https://the-booking-app-backend.onrender.com/api/reservation", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData),
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong with the reservation submission.');
        }
  
        const responseData = await response.json();
        // Handle successful reservation here, maybe clear the form or show a success message.
        console.log(responseData); // For debugging, remove in production.
        toast.success('Reservation submitted successfully!');
        navigate("/success")
  
        // Reset the form or redirect the user as needed
        // e.g., navigate('/success'); for React Router
      } catch (error) {
        console.error('Failed to submit reservation:', error);
        toast('Failed to submit reservation. Please try again.');
      }
    }
  };
  

  

  
  
  
  

  useEffect(() => {
    // Ensure dates are defined and have at least one date range object
    if (dates && dates.length && dates[0].startDate && dates[0].endDate) {
      // Calculate the difference in days
      const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
      function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
      }

      const startDate = new Date(dates[0].startDate);
      const endDate = new Date(dates[0].endDate);
      const diffDays = dayDifference(startDate, endDate);

      setDays(diffDays);
    }
  }, [dates]); // useEffect will run when dates changes

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  // const handleClick = () => {
  //   if (user) {
  //     setOpenModal(true);
  //   } else {
  //     navigate("/login");
  //   }
  // };

  if (loading) {
    return (
      <div>
        <Navbar />
      
        {/* <Header  /> */}
        <div>Loading please wait...</div>
        <Footer />
      </div>
    );
  }


  const perDayRate = data?.cheapestPrice ?? 0; // Assuming `cheapestPrice` is the per day rate from `data`
  const totalPrice = perDayRate * days * formData.rooms;

  return (
    <div>
      <Navbar />
      <ToastContainer/>
      {/* <Header type="list" /> */}
      <div className='header'>
        <div className='headerContainer'>
          <HeaderList />
          <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
          <p className="headerDesc">
            Get rewarded for your travels - unlock instant saving of 10% or more with a free Iambooking account
          </p>
          {!user && (
            <button className="headerBtn">
              <Link to="/login" className="link-no-underline">Sign in / Register</Link>
            </button>
          )}
        </div>
      </div>
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img
                src={data.photos[slideNumber]}
                alt=""
                className="sliderImg"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
                <div className="mainhotel" style={{display:'flex',justifyContent:'space-between',gap:'30px'}}>

        <div className="hotelWrapper">
     
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance} m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ₹{data.cheapestPrice} at this property and get a
            free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  width={100}
                  height={300}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">{data.desc}</p>
            </div>
            
          </div>
        </div>
        <div className="bookingForm">
     
      <form onSubmit={handleSubmit}>
      {step === 1 && (
        <>
         <h2 className="bookingFormTitle">Booking Details</h2>
        <div className="bookingFormItem">
          <label>Total Price</label>
          <p className="totalPrice">{totalPrice} ₹</p>
          <p className="cancellationPolicy">Free cancellation 1 day prior to stay</p>
        </div>
        
        <div className="bookingFormItem">
          <label>Check-In & Check-out Date</label>
          <input
          type="date"
          className="datepick"
          name="checkIn"
          value={formData.checkIn}
          min={todayFormatted}
          onChange={handleChange}
        />
          <input
          type="date"
          className="datepick"
          name="checkOut"
          value={formData.checkOut}
          min={formData.checkIn} 
          onChange={handleChange}
        />
        </div>
        
        <div className="bookingFormItem">
          <label>Reservation</label>
          <select name="rooms" value={formData.rooms} onChange={handleChange}>
            <option value="1">1 room</option>
            <option value="2">2 rooms</option>
            <option value="3">3 rooms</option>
            {/* Add more options as needed */}
          </select>
          <select name="guests" value={formData.guests} onChange={handleChange}>
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            {/* Add more options as needed */}
          </select>
        </div>
        
        <div className="bookingFormItem">
          <label>Room Type</label>
          <select name="roomType" value={formData.roomType} onChange={handleChange}>
            <option value="1 King Bed Standard Non Smoking">King Bed Standard </option>
            <option value="1 Queen Bed Standard Non Smoking">Queen Bed Standard </option>
            <option value="1 Twin Bed Minimalist Non Smoking">Twin Bed  Minimalist </option>
         
          </select>
        </div>
        <button type="button" onClick={() => setStep(2)} className="confirmBookingButton">Confirm Booking</button>
        </>
        )}

{step === 2 && (
    <>
      <h2 className="bookingFormTitle1">Payment Details</h2>

      <div className="bookingFormItem">
          <label>Guest Name</label>
          <input type="text" id="guestname" name="guestname" value={formData.guestname} onChange={handleChange} required title="Please Enter Guest Name" minLength="3"  className="custom-input" placeholder="Full Name" />
        </div>
  
        <div className="bookingFormItem">
          <label>Email</label>
          <input type="email" name="email" value={formData.email}  id="email" onChange={handleChange} required title="Please Enter Email" className="custom-input" placeholder="name@gmail.com"/>
        </div>
      
        <div className="bookingFormItem">
          <label>Phone</label>
          <input type="text" name="phone" id="phone" onChange={handleChange} value={formData.phone} required title="Please Enter Phone Number 10 Digits" pattern="\d{10}" maxLength="10" className="custom-input" placeholder="phone number"/>
        </div>
  
        <div className="bookingFormItem">
          <label>Card Number</label>
          <input type="text" name="cardnumber" id="cardnumber" onChange={handleChange} value={formData.cardnumber} required title="Please Enter Card Number 16 Digits" pattern="\d{16}" maxLength="16" className="custom-input" placeholder="1111 2222 3333 4444"/>
        </div>
        

        <div className="bookingFormItem">
          <label>Expiry Date</label>
          <input
  type="text"
  name="expiryDate"
  id="expdate"
  maxLength="5"
  value={expiryDate} // Use expiryDate state instead of formData.expiryDate
  pattern="\d{2}/\d{2}"
  required
  title="Please Enter Expiry Date"
  onChange={handleExpiryDateChange} // Call handleExpiryDateChange instead
  className="custom-input"
  placeholder="MM/YY"
/>

        </div>

        <div className="bookingFormItem">
          <label>Cvv</label>
          <input type="text" name="cvv" id="cvv" pattern="\d{3}" onChange={handleChange} value={formData.cvv}  maxLength="3" required title="Please Enter Cvv Code" className="custom-input" placeholder="3**"/>
        </div>

      <button type="button" onClick={() => setStep(1)}>Back</button>
      <button type="submit">Submit</button>
    </>
  )}

      </form>
    </div>
      </div>
        <MailList />
        <Footer />
      </div>

     
    </div>
  );
};

export default Hotel;








