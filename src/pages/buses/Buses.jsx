
import React, { useContext, useState } from "react";
import "./buses.css";
import { BusSearchContext } from "../../context/BusSearchContext";
import {
  faBus,
  faCalendarDays,
  faFaceSmile,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import HeaderList from "../../components/headerList/HeaderList";

import img1 from "../../img/Bangalore.jpg";
import img2 from "../../img/Chennai.jpg";
import img3 from "../../img/Hyderabad.jpg";
import img4 from "../../img/pune.jpg";
import img5 from "../../img/delhi.jpg";
import img6 from "../../img/mumbai.jpg";
import img7 from "../../img/shimla.png";
import img8 from "../../img/jaipur.png";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

const Buses = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0 });

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useContext(BusSearchContext);

  // Calculate today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const destinations = [
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Delhi",
    "Mumbai",
  ];



  const busCorporations = [
    {
      id: 1,
      abbreviation: "APSRTC",
      fullName: "Andhra Pradesh State Road Transport Corporation",
      imageUrl: "https://gos3.ibcdn.com/apsrtc_logo-1649928651.png",
    },
    {
      id: 2,
      abbreviation: "HRTC",
      fullName: "Himachal Road Transport Corporation",
      imageUrl: "https://gos3.ibcdn.com/hrtc_logo-1649928862.png",
    },
    {
      id: 3,
      abbreviation: "RSRTC",
      fullName: "Rajasthan State Road Transport Corporation",
      imageUrl: "https://gos3.ibcdn.com/rsrtc_logo-1649929033.png",
    },
    {
      id: 4,
      abbreviation: "SBSTC",
      fullName: "South Bengal State Transport Corporation",
      imageUrl: "https://gos3.ibcdn.com/sbstc-1649930682.png",
    },

    {
      id: 5,
      abbreviation: "WBTC",
      fullName: "West Bengal Transport Corporation",
      imageUrl: "https://gos3.ibcdn.com/wbtc_logo-1649930411.png",
    },
    {
      id: 6,
      abbreviation: "TSRTC ",
      fullName: "Telangana State Road Transport Corporation",
      imageUrl: "https://gos3.ibcdn.com/TSRTC-1649929129.png",
    },
  ];

  const handleFromInput = (value) => {
    setShowFromSuggestions(true);
    setFrom(value);
    filterSuggestions(value, setFromSuggestions);
  };

  const handleToInput = (value) => {
    setShowToSuggestions(true);
    setTo(value);
    filterSuggestions(value, setToSuggestions);
  };

  const filterSuggestions = (input, setSuggestions) => {
    const filtered = destinations.filter((destination) =>
      destination.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }));
  };

  const handleSearch = () => {
    dispatch({
      type: "NEW_BUS_SEARCH",
      payload: {
        from,
        to,
        date,
      },
    });
    navigate("/bus-results");
  };


  const handleExplore = (from,to) => {
    dispatch({
      type: "NEW_BUS_SEARCH",
      payload: {
        from: from,
        to: to,
        date: formattedDate,
      },
    });
    navigate("/bus-results");
  };
  


 
  const currentDate = new Date();

  const formattedDate = currentDate.toISOString().split('T')[0];

  console.log(formattedDate)


  // const handleExplore = (from, to) => { // Setting a default value for 'to' as "Chennai"
  //   fetch(`https://the-booking-app-backend.onrender.com/api/buses?route.from=${from}&route.to=${to}&date=${formattedDate}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('Explore buses data:', data);
  //       // Pass the 'from', 'to', and 'date' parameters to BusResults
  //       navigate("/bus-results", { state: { from, to, date: formattedDate } });
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //       alert(error.message);
  //     });
  // };

  // const handleExplore = (from, to = "Chennai") => {
  //   // Current date formatting omitted for brevity
  //   fetch(`https://the-booking-app-backend.onrender.com/api/buses?route.from=${from}&route.to=${to}&date=${formattedDate}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log('Explore buses data:', data);
  //       navigate("/bus-results", { state: { from, to, date: formattedDate } });
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //       alert(error.message);
  //     });
  // };
  




  return (
    <>
      <Navbar />
      <div className="header">
        <div className="headerContainer">
          <HeaderList />

          <h1 className="headerTitle">Find your ideal Bus Ticket</h1>
          <div className="headerSearch">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faBus} className="headerIcon" />
              <input
                type="text"
                placeholder="From"
                value={from}
                className="headerSearchInput"
                onChange={(e) => handleFromInput(e.target.value)}
                onFocus={() => setShowFromSuggestions(true)}
              />
              {showFromSuggestions && (
                <ul className="destinationSuggestions">
                  {fromSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="suggestionItem"
                      onClick={() => {
                        setFrom(suggestion);
                        setShowFromSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faBus} className="headerIcon" />
              <input
                type="text"
                placeholder="To"
                value={to}
                className="headerSearchInput"
                onChange={(e) => handleToInput(e.target.value)}
                onFocus={() => setShowToSuggestions(true)}
              />
              {showToSuggestions && (
                <ul className="destinationSuggestions">
                  {toSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="suggestionItem"
                      onClick={() => {
                        setTo(suggestion);
                        setShowToSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <input
                type="date"
                className="headerSearchInput"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
              // readOnly
              />
            </div>

            <div className="headerSearchItem">
              <button className="headerBtn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="routes">

        <div class="top-routes">
          <h2>Top Routes</h2>
          <div className="routes-container">
            <div className="routes-item">
              <div className="routes-info">
                <img
                  alt="photo"
                  className="routes-image"
                  src={img1} // Assuming imageUrl exists
                />
                <div>
                  <h2 className="routes-name">Bangalor &rarr; Chennai</h2>
                  <div className="starting-info">
                    <span>Explore & Book Tickets Now</span>
                  </div>
                </div>
              </div>
              <div className="exp-btn">
                <button class="view-all-button" onClick={() => handleExplore("Bangalore","Chennai")} >View all buses</button>
              </div>
            </div>


            <div className="routes-item">
              <div className="routes-info">
                <img
                  alt="photo"
                  className="routes-image"
                  src={img2} // Assuming imageUrl exists
                />
                <div>
                  <h2 className="routes-name">Chennai &rarr; Coimbatore</h2>
                  <div className="starting-info">
                    <span>Explore & Book Tickets Now</span>
                  </div>
                </div>
              </div>
              <div className="exp-btn">
                <button class="view-all-button" onClick={() => handleExplore("Chennai", "Coimbatore")} >View all buses</button>
              </div>
            </div>


            <div className="routes-item">
              <div className="routes-info">
                <img
                  alt="photo"
                  className="routes-image"
                  src={img3} // Assuming imageUrl exists
                />
                <div>
                  <h2 className="routes-name">Hyderabad &rarr; Vijayawada</h2>
                  <div className="starting-info">
                    <span>Explore & Book Tickets Now</span>
                  </div>
                </div>
              </div>
              <div className="exp-btn">
                <button class="view-all-button" onClick={() => handleExplore("Hyderabad", "Vijayawada")} >View all buses</button>
              </div>
            </div>






            <div className="routes-item">
              <div className="routes-info">
                <img
                  alt="photo"
                  className="routes-image"
                  src={img5} // Assuming imageUrl exists
                />
                <div>
                  <h2 className="routes-name">Delhi &rarr; Lucknow</h2>
                  <div className="starting-info">
                    <span>Explore & Book Tickets Now</span>
                  </div>
                </div>
              </div>
              <div className="exp-btn">
                <button class="view-all-button" onClick={() => handleExplore("Delhi", "Lucknow")} >View all buses</button>
              </div>
            </div>

            <div className="routes-item">
              <div className="routes-info">
                <img
                  alt="photo"
                  className="routes-image"
                  src={img6} // Assuming imageUrl exists
                />
                <div>
                  <h2 className="routes-name">Mumbai &rarr; Surat</h2>
                  <div className="starting-info">
                    <span>Explore & Book Tickets Now</span>
                  </div>
                </div>
              </div>
              <div className="exp-btn">
                <button class="view-all-button" onClick={() => handleExplore("Mumbai", "Surat")} >View all buses</button>
              </div>
            </div>

            <div className="routes-item">
              <div className="routes-info">
                <img
                  alt="photo"
                  className="routes-image"
                  src={img7} // Assuming imageUrl exists
                />
                <div>
                  <h2 className="routes-name">Shimla &rarr; Manali</h2>
                  <div className="starting-info">
                    <span>Explore & Book Tickets Now</span>
                  </div>
                </div>
              </div>
              <div className="exp-btn">
                <button class="view-all-button" onClick={() => handleExplore("Shimla", "Manali")} >View all buses</button>
              </div>
            </div>


            <div className="routes-item">
              <div className="routes-info">
                <img
                  alt="photo"
                  className="routes-image"
                  src={img8} // Assuming imageUrl exists
                />
                <div>
                  <h2 className="routes-name">Jaipur &rarr; Udaipur</h2>
                  <div className="starting-info">
                    <span>Explore & Book Tickets Now</span>
                  </div>
                </div>
              </div>
              <div className="exp-btn">
                <button class="view-all-button" onClick={() => handleExplore("Jaipur", "Udaipur")} >View all buses</button>
              </div>
            </div>

            <div className="routes-item">
              <div className="routes-info">
                <img
                  alt="photo"
                  className="routes-image"
                  src={img4} // Assuming imageUrl exists
                />
                <div>
                  <h2 className="routes-name">Pune &rarr; Goa </h2>
                  <div className="starting-info">
                    <span>Explore & Book Tickets Now</span>
                  </div>
                </div>
              </div>
              <div className="exp-btn">
                <button class="view-all-button" onClick={() => handleExplore("Pune", "Goa")} >View all buses</button>
              </div>
            </div>




          </div>
        </div>
      </div>

      {/* Government Buses */}

      <div style={{ textAlign: "center", margin: "40px 0" }}>
        <h2 style={{ marginBottom: "20px" }}>Government Buses</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {busCorporations.map((corporation) => (
            <div
              key={corporation.id}
              style={{
                width: "150px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={corporation.imageUrl}
                alt={corporation.abbreviation}
                style={{ width: "100%", height: "auto", borderRadius: "50%" }}
              />
              <div style={{ marginTop: "10px" }}>
                <strong>{corporation.abbreviation}</strong>
                <p style={{ margin: "5px 0" }}>{corporation.fullName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Book Component  */}

      <div className="howToBookContainer">
        <h2>How to Book</h2>
        <div className="stepsContainer">
          <div className="step">
            <FontAwesomeIcon
              icon={faBus}
              style={{ color: "#0071c2" }}
              size="7x"
            />
            <p>Search For Bus</p>
          </div>
          <div className="step">
            <FontAwesomeIcon
              icon={faTicket}
              style={{ color: "#0071c2" }}
              size="7x"
            />
            <p>Add Tickets</p>
          </div>
          <div className="step">
            {/* <FontAwesomeIcon icon={faCreditCard} style={{color: "#0071c2",}}  size="7x" /> */}
            <FontAwesomeIcon
              icon={faFaceSmile}
              style={{ color: "#0071c2" }}
              size="7x"
            />
            <p>Enjoy journey</p>
          </div>
        </div>
      </div>
      <center>
        <MailList />
        <Footer />
      </center>

    </>
  );
};

export default Buses;


