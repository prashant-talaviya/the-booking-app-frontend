import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { Range } from "react-range";
import Navbar from "../../components/Navbar/Navbar";
import HeaderList from "../../components/headerList/HeaderList";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import notfound from "../../img/notfound.png";
import "./list.css";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [dates, setDates] = useState(location.state?.dates || []);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options || { adult: 1, children: 0, room: 1 });
  const [selectedRatings, setSelectedRatings] = useState(new Set());
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const { user } = useContext(AuthContext);
  const [minMaxPrice, setMinMaxPrice] = useState([0, 6000]);


  const handleRatingChange = (e) => {
    const rating = parseInt(e.target.value);
    const updatedRatings = new Set(selectedRatings);

    if (updatedRatings.has(rating)) {
      updatedRatings.delete(rating);
    } else {
      updatedRatings.add(rating);
    }

    setSelectedRatings(updatedRatings);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    const updatedTypes = new Set(selectedTypes);

    if (updatedTypes.has(type)) {
      updatedTypes.delete(type);
    } else {
      updatedTypes.add(type);
    }

    setSelectedTypes(updatedTypes);
  };

  // Construct the rating string for the URL
  let ratingsString = "";
  if (selectedRatings.size > 0) {
    ratingsString = `&rating=${Array.from(selectedRatings).join("&rating=")}`;
  }

  // Construct the type string for the URL
  let typeString = "";
  if (selectedTypes.size > 0) {
    typeString = `&type=${Array.from(selectedTypes).join("&type=")}`;
  }

  const { data, loading, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${minMaxPrice[0]}&max=${minMaxPrice[1]}${ratingsString}${typeString}&featured=true`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <div className="header">
        <div className="headerContainer">
          <HeaderList />
          {!user && (
            <button className="headerBtn">
              <Link to="/login" className="link-no-underline">
                Sign in / Register
              </Link>
            </button>
          )}
        </div>
      </div>
      <div className="listc">
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <div className="lsItem">
                <label>Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where are you going?"
                />
              </div>
              {/* <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={() => setOpenDate(!openDate)}>
                  {`${format(dates[0]?.startDate, "MM/dd/yyyy")} to ${format(dates[0]?.endDate, "MM/dd/yyyy")}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="dateRange"
                  />
                )}
              </div> */}
              <div className="lsItem">
                <label>Price Range (per night)</label>
                <Range
                  step={100}
                  min={0}
                  max={6000}
                  values={minMaxPrice}
                  onChange={(values) => setMinMaxPrice(values)}
                  renderTrack={({ props, children }) => (
                    <div {...props} style={{ ...props.style, height: "6px", width: "100%", background: "#ccc", alignSelf: "center" }}>
                      {children}
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div {...props} style={{ ...props.style, height: "20px", width: "20px", borderRadius: "50%", backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0px 2px 6px #AAA", border: isDragged ? "3px solid #555" : "3px solid #CCC" }} />
                  )}
                />
                <output style={{ marginTop: "10px" }}>{minMaxPrice[0]} - {minMaxPrice[1]}</output>
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Rating</span>
                <div className="verticalCheckboxes">
                  {[...Array(5).keys()].map((index) => (
                    <label key={index} className="ratingLabel">
                      <input
                        type="checkbox"
                        value={index + 1}
                        onChange={handleRatingChange}
                        checked={selectedRatings.has(index + 1)}
                      />
                      {`${index + 1} star`}
                    </label>
                  ))}

                </div>
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Property Type</span>
                <div className="verticalCheckboxes">
                  <label className="typeLabel">
                    <input
                      type="checkbox"
                      value="villa"
                      onChange={handleTypeChange}
                      checked={selectedTypes.has("villa")}
                    />
                    Villa
                  </label>
                  <label className="typeLabel">
                    <input
                      type="checkbox"
                      value="hotel"
                      onChange={handleTypeChange}
                      checked={selectedTypes.has("hotel")}
                    />
                    Hotel
                  </label>
                  <label className="typeLabel">
                    <input
                      type="checkbox"
                      value="resort"
                      onChange={handleTypeChange}
                      checked={selectedTypes.has("resort")}
                    />
                    Resort
                  </label>
                  <label className="typeLabel">
                    <input
                      type="checkbox"
                      value="apartment"
                      onChange={handleTypeChange}
                      checked={selectedTypes.has("apartment")}
                    />
                    Apartment
                  </label>
                  <label className="typeLabel">
                    <input
                      type="checkbox"
                      value="cabin"
                      onChange={handleTypeChange}
                      checked={selectedTypes.has("cabin")}
                    />
                    Cabin
                  </label>
                </div>
              </div>
              <button onClick={handleClick} className="searchButton">
                Search
              </button>
            </div>
            <div className="listResult">
              {loading ? (
                "loading please wait"
              ) : data.length > 0 ? (
                data.map((item) => <SearchItem key={item._id} item={item} />)
              ) : (
                <div className="noHotels">
                  <div className="noHotelsContent">
                    <center>
                      <img src={notfound} alt="not found" />
                      <p>We can't seem to find any hotels that match your search criteria.</p>
                    </center>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

