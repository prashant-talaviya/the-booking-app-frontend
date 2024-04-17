import React, { useContext } from 'react'
import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
import reservation from "../../pages/reserve/ReservationForm";


const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    // Call the logout function here
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className='navbar'>
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo"><b>THE BOOKING APP</b></span>
        </Link>
        {user ? (
          <div className="navItems">
            <Link to="/update" className="link-no-underline">  <span>Hello, {user.username} 👋🏻</span></Link>

            <button className="navButton">
              <div className='dropdown'>
              <Link to="/mybooking" style={{ color: "inherit", textDecoration: "none" }}>
                Account
              </Link>
                <div class="dropdown-content">
                  <Link to="/mybooking">Show Reservation</Link>
                  <Link to="/mybusbooking">Show Bus Ticket</Link>
                  <Link to="/myflightbooking">Show Flight Ticket</Link>
                </div>
              </div>
            </button>

            <button className="navButton" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">
              <Link to="/registration" className="link-no-underline">Register</Link>
            </button>
            <button className="navButton">
              <Link to="/login" className="link-no-underline">Log in</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;




