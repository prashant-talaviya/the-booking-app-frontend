import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Home from "./pages/home/Home"
import List from "./pages/list/List"
import Hotel from "./pages/hotel/Hotel"
import Login from "./pages/login/Login";
import Reservationform from "./pages/reserve/ReservationForm"
import MyBookings from "./pages/reserve/MyBookings";
import Success from "./pages/reserve/Success";
import Registration from "./pages/Registration/Registration";
import Buses from "./pages/buses/Buses";
import Flights from "./pages/flights/Flights";
import BusResults from "./pages/buses/BusResults";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";
import FlightResults from "./pages/flights/FlightResults";
import MyBusBooking from "./pages/buses/MyBusBookings";
import MyFlightBookings from "./pages/flights/MyFlightBookings";



function App() {
  return(
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/hotels" element={<List/>}/>
    <Route path="/hotels/:id" element={<Hotel/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/reservation-form" element={<Reservationform/>}/>
    <Route path="/mybooking" element={<MyBookings/>}/>
    <Route path="/success" element={<Success/>}/>
    <Route path="/registration" element={<Registration/>}/>
    <Route path="/update" element={<UpdateProfile/>}/>

    <Route path="/bus" element={<Buses/>}/>
    <Route path="/bus-results" element={<BusResults/>}/>
    <Route path="/mybusbooking" element={<MyBusBooking/>}/>

    <Route path="/flights" element={<Flights/>}/>
    <Route path="/flight-results" element={<FlightResults/>}/>
    <Route path="/myflightbooking" element={<MyFlightBookings/>}/>

    

    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
