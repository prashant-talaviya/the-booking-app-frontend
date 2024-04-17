
import React, { useState, useContext, useEffect } from "react";
import ReservationForm from "./ReservationForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: user ? user.username : "",
    hotelId: hotelId,
    selectedRooms: selectedRooms,
  });
  const { data } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Dates:", dates);
  }, [dates]);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = dates ? getDatesInRange(dates[0]?.startDate, dates[0]?.endDate) : [];
  
  const isAvailable = (roomNumber) => {
    // Check if roomNumber is defined and has the bookedDates property
    if (roomNumber && roomNumber.bookedDates) {
      // Check if any of the bookedDates fall within the selected date range
      const isBooked = alldates.some((date) =>
        roomNumber.bookedDates.includes(new Date(date).toISOString().slice(0, 10))
      );

      // Return true if the room is not booked
      return !isBooked;
    }

    // Return false if roomNumber is undefined or bookedDates is undefined
    return true;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleReservation = async () => {
    try {
      const reservationData = {
        ...formData,
        selectedRooms: selectedRooms,
      };

      await axios.post("https://the-booking-app-backend.onrender.com/api/reservation", reservationData);

      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const res = await axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/success");
    } catch (err) {
      console.error(err);
    }
  };

  // Filter out rooms that are already booked
  const availableRooms = data.filter((item) => {
    return item.roomNumbers.some((roomNumber) => isAvailable(roomNumber));
  });

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <br />
        <span>Select your rooms:</span>
        {availableRooms.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)} // Disable checkbox if room is booked
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {selectedRooms.length > 0 && (
          <ReservationForm
            handleReservation={handleReservation}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
};

export default Reserve;
