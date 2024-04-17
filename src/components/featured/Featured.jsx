


import React, { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import addDays from 'date-fns/addDays';
import citysurat from "../../img/citysurat.png";
import citymumbai from "../../img/citymumbai.png";
import citypune from "../../img/citypune.png";
import citydelhi from "../../img/citydelhi.png";
import citygoa from "../../img/citygoa.png";


import "./featured.css";
import useFetch from '../../hooks/useFetch';

const Featured = () => {
  const { data, loading } = useFetch("/hotels/countByCity?cities=surat,mumbai,delhi,pune,goa");
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);

  const handleExplore = (city) => {
    // Ensure you have a default date range and options set here as per your requirements

    const startDate = new Date();
    const endDate = addDays(new Date(), 1);


    const dates = [{ startDate: startDate, endDate: endDate, key: 'selection' }];
    const options = { adult: 1, children: 0, room: 1 };

    dispatch({
      type: "NEW_SEARCH",
      payload: {
        destination: city,
        dates,
        options
      }
    });

    navigate("/hotels", { state: { destination: city, dates, options } });
  };

  return (
    <>
      <div class="demo_title">
        <h1>Book Hotels at Popular Destinations</h1>
      </div>
      <div className="propertiescard">
        <div class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-5">
          <div class="tpn_card">
            <img src={citysurat} style={{ height: '200px', width: '200px' }} class="w-1800 mb-4" />
            <h5>Surat</h5>
            <a href="javascript:;" class="btn tpn_btn" onClick={() => handleExplore('surat')} >Explore</a>
          </div>
          <div class="tpn_card">
            <img src={citymumbai} style={{ height: '200px', width: '200px' }} class="w-100 mb-4" />
            <h5>Mumbai</h5>

            <a href="javascript:;" class="btn tpn_btn" onClick={() => handleExplore('mumbai')} >Explore</a>
          </div>
          <div class="tpn_card">
            <img src={citypune} style={{ height: '200px', width: '200px' }} class="w-100 mb-4" />
            <h5>Pune</h5>

            <a href="javascript:;" class="btn tpn_btn" onClick={() => handleExplore('pune')} >Explore</a>
          </div>
          <div class="tpn_card">
            <img src={citydelhi} style={{ height: '200px', width: '200px' }} class="w-100 mb-4" />
            <h5>Delhi</h5>

            <a href="javascript:;" class="btn tpn_btn" onClick={() => handleExplore('delhi')} >Explore</a>
          </div>

          <div class="tpn_card">
            <img src={citygoa} style={{ height: '200px', width: '200px' }} class="w-100 mb-4" />
            <h5>Goa</h5>

            <a href="javascript:;" class="btn tpn_btn" onClick={() => handleExplore('goa')} >Explore</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
