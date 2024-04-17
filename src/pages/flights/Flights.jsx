


import React, { useContext, useState } from 'react';
import "./flights.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faCalendarDays,faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FlightSearchContext } from '../../context/FlightSearchContext';
import Navbar from '../../components/Navbar/Navbar';
import HeaderList from '../../components/headerList/HeaderList';

import {  faPerson,faTicket, faCreditCard} from '@fortawesome/free-solid-svg-icons';

import { faMapMarkedAlt, faGlobe, faUsers, faShip } from '@fortawesome/free-solid-svg-icons';

import offer1 from "../../img/offer1.png";
import offer2 from "../../img/offer2.png";
import offer3 from "../../img/offer3.png";
import offer4 from "../../img/offer4.png";
import offer5 from "../../img/offer5.png";


import img1 from "../../img/germany.png";
import img2 from "../../img/uk.png";
import img3 from "../../img/canada.png";
import img4 from "../../img/usa.png";
import img5 from "../../img/hongkong.png";
import img6 from "../../img/thailand.png";
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';

const Flights = () => {
    const [fromAirport, setFromAirport] = useState("");
    const [toAirport, setToAirport] = useState("");
    const [date, setDate] = useState("");



    

    const navigate = useNavigate();
    const { dispatch } = useContext(FlightSearchContext);

    const today = new Date().toISOString().split('T')[0];

    const popularFlightRoutes = [
      {
        id: 1,
        from: "Surat",
        to: "Mumbai",
        image: img1,
      },
      {
        id: 2,
        from: "Mumbai",
        to: "Goa",
        image: img2,
      },
      {
        id: 2,
        from: "Pune",
        to: "Agra",
        image: img3,
      },
      {
        id: 2,
        from: "Gandhinagar",
        to: "Bangalore",
        image: img4,
      },
      {
        id: 2,
        from: "Delhi",
        to: "Mumbai",
        image: img5,
      },
      {
        id: 2,
        from: "Banglore",
        to: "Surat",
        image: img6,
      },
    ];

    
    const offers = [
      {
        id: 1,
        title: 'New User Offer',
        description: 'Get Discount on Booking First Flight with Us',
        imageUrl: offer1,
        bookingPeriod: 'Valid till: 31st Mar, 2024',
        promoCode: 'EMTFIRST'
      },
      {
        id: 2,
        title: 'Flash Deal',
        description: 'Winter Flash Deal on Travel Bookings from 9 PM - 12 AM',
        imageUrl: offer2,
        bookingPeriod: 'Valid till: 31st Mar, 2024',
        promoCode: 'FLASHDEALS'
      },
      {
        id: 3,
        title: 'Win Vouchers',
        description: 'Travel and Win Assured Vouchers Worth INR 4000',
        imageUrl: offer3,
        bookingPeriod: 'Valid till: 31st Mar, 2024',
        promoCode: 'DELIGHT'
      }, {
        id: 4,
        title: 'Free Cab Offer',
        description: 'Enjoy Free Cab on Flight Bookings with TBA',
        imageUrl: offer4,
        bookingPeriod: 'Valid till: 31st Mar, 2024',
        promoCode: 'FREECAB'
      },
      {
        id: 5,
        title: 'Deal of the Day',
        description: 'Enjoy Different Deals For Each Day with TBA',
        imageUrl: offer5,
        bookingPeriod: 'Valid till: 31st Mar, 2024',
        promoCode: 'EASEDAY'
      },
    ];



    const statsData = [
      {
        icon: faPlane,
        num:'2000+',
        text: 'Daily flights'
      },
      {
        icon: faMapMarkedAlt,
        num:'80+',
        text: 'Domestic Destinations'
      },
      {
        icon: faGlobe,
        num:'30+',
        text: 'International Destinations'
      },
      {
        icon: faUsers,
        num:'5000+',
        text: 'happy passengers'
      },
      {
        icon: faShip,
        num:'300+',
        text: 'Fleet strong'
      }
    ];



    const fromAirportOptions = ["Delhi", "Bangalore", "Goa", "Mumbai", "Coimbatore", "Lucknow"];
    const toAirportOptions = ["Mumbai", "Chennai", "Pune", "Ahmedabad", "Panjab", "Kolkata"];




    const handleSearch = () => {
      dispatch({
          type: "NEW_FLIGHT_SEARCH",
          payload: {
              fromAirport,
              toAirport,
              date,
              options: { adult: 1, children: 0 }, // Assuming default values, adjust as needed
          }
      });
      navigate("/flight-results");
    };

    return (
        <>
            <Navbar/>
            <div className='header'>
                <div className="headerContainer">
                    <HeaderList/>
                    <h1 className="headerTitle">Millions of cheap flights. One simple search.</h1>
                    <div className="headerSearch">
                    <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPlane} className='headerIcon'/>
                            <select
                                className='headerSearchInput'
                                value={fromAirport}
                                onChange={(e) => setFromAirport(e.target.value)}
                            >
                                <option value="">From</option>
                                {fromAirportOptions.map((airport, index) => (
                                    <option key={index} value={airport}>{airport}</option>
                                ))}
                            </select>
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPlane} className='headerIcon'/>
                            <select
                                className='headerSearchInput'
                                value={toAirport}
                                onChange={(e) => setToAirport(e.target.value)}
                            >
                                <option value="">To</option>
                                {toAirportOptions.map((airport, index) => (
                                    <option key={index} value={airport}>{airport}</option>
                                ))}
                            </select>
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                            <input type="date" className='headerSearchInput' value={date} onChange={(e) => setDate(e.target.value)} min={today} />
                        </div>
                        <div className="headerSearchItem">
                            <button className="headerBtn" onClick={handleSearch}>Search</button>
                        </div>


        
                    </div>
                </div>
            </div>

            {/* Offer Component  */}

 {/* <div className="offer">
 <h1>Amazing Travel Offers and Deals</h1>
 <div className="offers-container">
       {offers.map((offer) => (
        <div key={offer.id} className="offer-card">
          <img src={offer.imageUrl} alt={offer.title} />
          <h3 className="offer-title">{offer.title}</h3>
          <p>{offer.description}</p>
          <div className="offer-period">{offer.bookingPeriod}</div>
          <div className="promo-code">{offer.promoCode}</div>
          <button className="apply-button">Apply Now</button>
        </div>
      ))}
    </div>
    </div> */}

     {/* popular Routes  */}
     <div className="popularRoutesContainer">
      <h2 >Flights  </h2>
      <div className="routesList">
        {popularFlightRoutes.map((route)=> (
          <div key={route.id} className="routeCard">
            <img src={route.image} alt={`Flight from ${route.from} to ${route.to}`} className='routeImage'/>
            <div className="routeInfo">
              <h3>Flights From {route.from} To</h3>
              <p>{route.to}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

{/* Stats container  */}
    <div className="stats-container">
      {statsData.map((stat, index) => (
        <div className="stat-card" key={index}>
          <FontAwesomeIcon icon={stat.icon} className='stat-icon' />
          <div>{stat.num}</div>
          <div>{stat.text}</div>
        </div>
      ))}
    </div>
    

   {/* How to Book Component  */}

    <div className="howToBookContainer">
      <h2 >How to Book</h2>
      <div className="stepsContainer">
        <div className="step">
          <FontAwesomeIcon icon={faPlane} style={{color: "#0071c2",}}  size="7x" />
          <p>Search For Flights</p>
        </div>
        <div className="step">
          <FontAwesomeIcon icon={faTicket} style={{color: "#0071c2",}}  size="7x" />
          <p>Add Tickets</p>
        </div>
        <div className="step">
          <FontAwesomeIcon icon={faFaceSmile} style={{color: "#0071c2",}}  size="7x" />
          <p>Enjoy journey</p>
        </div>
      </div>
    </div>
    <center>
    <MailList/>
     <Footer/></center>
        </>
    );
};

export default Flights;

