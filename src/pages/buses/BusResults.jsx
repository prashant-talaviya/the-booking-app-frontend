
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./buses.css";
import "./busResults.css";
import { BusSearchContext } from "../../context/BusSearchContext";
import Navbar from "../../components/Navbar/Navbar";
import HeaderList from "../../components/headerList/HeaderList";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";
import wheel from "../../img/driving.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

const BusResults = () => {
  const { user } = useContext(AuthContext);
  const [step, setStep] = useState(1); // New state to track the current step


  const { from, to, date } = useContext(BusSearchContext);
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedBus, setSelectedBus] = useState(null);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [passengerForm, setPassengerForm] = useState({
    pname: "",
    age: "",
    email: "",
    phone: "",
  });


  const proceedToPassengerDetails = () => {
    if (selectedSeats.length === 0) {
      toast("Please select at least one seat.");
      return;
    }
    setStep(2); // Move to passenger details step
  };

  const backToSeatSelection = () => {
    setStep(1); // Go back to seat selection
  };

  const navigate = useNavigate();


  const handleSelectSeats = (bus) => {
    setSelectedBus(bus);
    setShowSeatSelection(true);
  };

  const handleClose = () => {
    setShowSeatSelection(false);
  };

  const selectSeat = (seatNumber, isBooked) => {
    if (isBooked) {
      // If the seat is booked, do not allow it to be selected
      return;
    }
    // Allow toggling selection only if seat is not booked
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((num) => num !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const handlePassengerInputChange = (event) => {
    const { name, value } = event.target;
    setPassengerForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };


  const validateForm = () => {
    let errors = {};

    // Validate Passenger Name (No special characters or numbers)
    if (!passengerForm.pname.match(/^[a-zA-Z\s]+$/)) {
      errors.pname = "Name must only contain letters and spaces.";
    }

    // Validate Age (Assuming age is required and should be a positive number)
    if (!passengerForm.age || passengerForm.age <= 0) {
      errors.age = "Please enter a valid age.";
    }

    // Validate Email (Simple regex for email validation)
    if (!/\S+@\S+\.\S+/.test(passengerForm.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate Phone Number (Must be exactly 10 digits)
    if (!/^\d{10}$/.test(passengerForm.phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    return errors;
  };




  const handleSubmitBooking = async () => {

    const validationErrors = validateForm();

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      // Show validation errors
      for (let key in validationErrors) {
        toast(validationErrors[key]);
      }
      return; // Stop the submission since there are errors
    }




    if (selectedSeats.length === 0 || !selectedBus) {
      alert("Please select at least one seat.");
      return;
    }

    setStep(1); // Reset to the first step
    setShowSeatSelection(false);

    // Loop through all selected seats to book them individually or as a batch (depending on your backend implementation)
    for (let seatNumber of selectedSeats) {
      const bookingData = {
        ...passengerForm,
        username: user.username,
        seatNumber: seatNumber, // Assuming your API can handle booking one seat at a time
      };

      try {
        const response = await fetch(
          `https://the-booking-app-backend.onrender.com/api/buses/${encodeURIComponent(
            selectedBus._id
          )}/book`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result); // For debugging
        toast("Ticket booked successfully!");

        // Reset form and selected seats after successful booking
        setPassengerForm({
          username: user.username,
          pname: "",
          age: "",
          email: "",
          phone: "",
        });
        setSelectedSeats([]);
        setShowSeatSelection(false); // Optionally close the seat selection modal
      } catch (error) {
        console.error("Booking error:", error.message);
        toast("Failed to book the ticket. Please try again.");
      }
    }
  };



  useEffect(() => {
    // Debugging: Log the values to ensure they are what we expect
    console.log("Fetching buses for:", { from, to, date });

    const fetchBuses = async () => {
      setLoading(true);
      setError("");
      try {
        // Construct the URL dynamically to ensure accuracy
        const url = `https://the-booking-app-backend.onrender.com/api/buses/search?from=${encodeURIComponent(
          from
        )}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`;
        console.log("Fetching from URL:", url); // Debugging: Log the URL

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Ensure the data is in the expected format, assuming an array
        if (Array.isArray(data)) {
          setBuses(data);
        } else {
          console.error("Expected an array of buses, but got:", data);
          setError("Unexpected response format from the server.");
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Ensure we have the necessary parameters before fetching
    if (from && to && date) {
      fetchBuses();
    } else {
      console.log("Missing parameters: from, to, or date");
      navigate("/bus");
    }
  }, [from, to, date]); // Only re-run the effect if these values change

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
        <Navbar />        <ToastContainer />


      <div className="header">
        <div className="headerContainer">
      
          <h1>Bus Search Results </h1>
        </div>
      </div>

      <div className="bus-results-container">
        {buses.length > 0 ? (
          buses.map((bus) => (
            <div key={bus._id} className="bus-card">
              <div className="bus-info">
                <div className="bus-name">{bus.name}</div>
                <div className="bus-type">{bus.busType}</div>
                <div className="bus-rating">Operates by  {bus.operator}</div>

              </div>
              <div className="bus-timing">
                <div className="departure-time">{bus.timing.departure}</div>
                <div className="duration">
                  -
                  {
                    // Calculate the duration in hours and minutes
                    `${Math.floor(
                      moment
                        .duration(
                          moment(bus.timing.arrival, "hh:mm A").diff(
                            moment(bus.timing.departure, "hh:mm A")
                          )
                        )
                        .asHours()
                    )}h ${moment
                      .duration(
                        moment(bus.timing.arrival, "hh:mm A").diff(
                          moment(bus.timing.departure, "hh:mm A")
                        )
                      )
                      .minutes()}m`
                  }
                  -
                </div>

                <div className="arrival-time">{bus.timing.arrival}</div>
              </div>
              <div className="bus-booking">
                <div className="price">₹{bus.ticketPrice}</div>
                <div className="seats-left">{bus.totalSeats} Seats </div>
                {/* <p >Amenities: {bus.amenities}</p> */}
                <button
                  className="select-seat-btn"
                  onClick={() => handleSelectSeats(bus)}
                >
                  Select Seat
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-buses-found">No buses found.</div>
        )}
      </div>

      {showSeatSelection && (
        <div className="seat-selection-modal">


          {step === 1 && (
            <>
              <div >	Booked Seat <FontAwesomeIcon icon={faSquare} style={{ color: 'F44336' }} />  &emsp; Selected Seat <FontAwesomeIcon icon={faSquare} style={{ color: '4CAF50' }} />  &emsp; Available Seat <FontAwesomeIcon icon={faSquare} style={{ color: 'dddddd' }} /></div>
              <div className="seats-container" >
                <div className="row-gap">-----------window seats-----------</div>
                <img src={wheel} alt="" width={50} height={50} />
                {
                  selectedBus.seats.map((seat, index) => {

                    return (
                      <>
                        <div
                          key={seat._id}
                          className={`seat ${seat.isBooked
                              ? "booked"
                              : selectedSeats.includes(seat.seatNumber)
                                ? "selected"
                                : ""
                            }`}
                          onClick={() => selectSeat(seat.seatNumber, seat.isBooked)}
                        >
                          {seat.seatNumber}
                        </div>

                        {index === 16 && <div className="row-gap">-----------Passage area-----------</div>}
                      </>
                    );
                  })
                }
                <div className="row-gap">-----------window seats-----------</div>
              </div>
              <button className="book-btn" onClick={proceedToPassengerDetails}>
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="passenger-details-form">
                <h1>Passenger details</h1>
                <input
                  type="text"
                  name="pname"
                  placeholder="Passenger Name"
                  value={passengerForm.pname}
                  onChange={handlePassengerInputChange}
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  maxLength="2"
                  value={passengerForm.age}
                  onChange={handlePassengerInputChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={passengerForm.email}
                  onChange={handlePassengerInputChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  maxLength="10"
                  value={passengerForm.phone}
                  onChange={handlePassengerInputChange}
                />
              </div>
              <button className="book-btn" onClick={backToSeatSelection}>
                Back
              </button>
              <button className="book-btn" onClick={handleSubmitBooking}>
                Book
              </button>
            </>
          )}
          <button className="book-btn" onClick={handleClose}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default BusResults;