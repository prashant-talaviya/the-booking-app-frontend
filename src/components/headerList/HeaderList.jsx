


import React, { useEffect } from 'react';
import './headerList.css';
import {
  faBus,
  faPlane,
  faBed,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

const HeaderList = () => {
  const [activeItem, setActiveItem] = React.useState('');
  const location = useLocation();

  useEffect(() => {
    // Set active item based on current path
    const path = location.pathname;
    if (path === '/') {
      setActiveItem('stays');
    } else if (path.includes('bus')) {
      setActiveItem('bus');
    } else if (path.includes('flights')) {
      setActiveItem('flights');
    } else if (path.includes('attractions')) {
      setActiveItem('attractions');
    }
  }, [location]);

  return (
    <div className="headerList">
      <div className={`headerListItem ${activeItem === 'stays' ? 'active' : ''}`}>
        <Link to="/" className="link-style">
          <FontAwesomeIcon icon={faBed} />
          <span>Stays</span>
        </Link>
      </div>

      <div className={`headerListItem ${activeItem === 'bus' ? 'active' : ''}`}>
        <Link to="/bus" className="link-style">
          <FontAwesomeIcon icon={faBus} />
          <span>Buses</span>
        </Link>
      </div>

      <div className={`headerListItem ${activeItem === 'flights' ? 'active' : ''}`}>
        <Link to="/flights" className="link-style">
          <FontAwesomeIcon icon={faPlane} />
          <span>Flights</span>
        </Link>
      </div>

      
    </div>
  );
};

export default HeaderList;

