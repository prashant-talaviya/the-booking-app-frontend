
import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import HeaderList from '../headerList/HeaderList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './header.css';
import { enGB } from 'date-fns/locale'; // Import the locale you need


function useOutsideClick(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, callback]);
}

const Header = ({ type }) => {
    const [destination, setDestination] = useState('');
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
    const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
    const [numGuests, setNumGuests] = useState(1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const destinations = ['surat', 'pune', 'mumbai', 'delhi','goa','agra','ahemdabad','rajkot']; // Replace this with your actual destinations data

    const navigate = useNavigate();
    const { dispatch } = useContext(SearchContext);
    const { user } = useContext(AuthContext);
    const datepickerRef = useRef();

    useOutsideClick(datepickerRef, () => setOpenDate(false));

    const handleSearch = () => {
        const startDate = parseISO(format(dates[0].startDate, 'yyyy-MM-dd'));
        const endDate = parseISO(format(dates[0].endDate, 'yyyy-MM-dd'));
        const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

        if (!destination.trim()) {
            toast.error('Please enter a destination to start searching.');
            return;
        }
        if (diffDays < 1) {
            toast.error('Please select a valid date range.');
            return;
        }
        if (diffDays > 30) {
            toast.error('Please select a date range of maximum 30 days.');
            return;
        }
        if (numGuests < 1) {
            toast.error('Please select at least one guest.');
            return;
        }

        dispatch({
            type: 'NEW_SEARCH',
            payload: { destination, dates, options, numGuests },
        });

        navigate('/hotels', { state: { destination, dates, options, numGuests } });
    };

    const updateDestination = (value) => {
        const filtered = destinations.filter((dest) =>
            dest.toLowerCase().includes(value.toLowerCase())
        );
        setDestination(value);
        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
    };

    const selectDestination = (value) => {
        setDestination(value);
        setShowSuggestions(false);
    };

    return (
        <div className="header">
            <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
                <HeaderList />
                <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                <p className="headerDesc">
                    Get rewarded for your travels - unlock instant savings of 10% or more with a
                    free Iambooking account
                </p>
                <ToastContainer />
                {!user && (
                    <button className="headerBtn">
                        <Link to="/login" className="headerBtn link-no-underline">
                            Sign in / Register
                        </Link>
                    </button>
                )}
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon" />
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            className="headerSearchInput"
                            value={destination}
                            onChange={(e) => updateDestination(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => {
                                // Use timeout to delay hiding suggestions until after a click is registered
                                setTimeout(() => setShowSuggestions(false), 200);
                            }}
                        />
                        {showSuggestions && (
                            <ul className="destinationSuggestions">
                                {filteredSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => selectDestination(suggestion)}
                                        className="suggestionItem"
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                        <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                            {`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(
                                dates[0].endDate,
                                'dd/MM/yyyy'
                            )}`}
                        </span>
                        {openDate && (
                            <div ref={datepickerRef} className="datePickerContainer">
                                <DateRange
  editableDateInputs={true}
  onChange={item => setDates([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={dates}
  className="dateRange"
  minDate={new Date()}
  locale={enGB} // Set the locale here
  weekStartsOn={1} // Set the first day of the week (0 for Sunday, 1 for Monday, etc.)
/>
                            </div>
                        )}
                    </div>
                    
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
