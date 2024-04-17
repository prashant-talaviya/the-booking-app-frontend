import React from 'react';
import './searchItem.css';
import { Link } from 'react-router-dom';

const SearchItem = ({ item }) => {
    

    return (
        <div className='searchItem'>
            <img src={item.photos[0] || ''} alt="" className="siImg" />

            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">{item.distance}m from center</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    {item.title}
                </span>
                <span className="siFeatures">
                    {item.desc}
                </span>
                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="siDetails">
                <div className='rating'>
                    {item.rating && (
                        <div className="fpRating">
                            {/* Display star icons based on rating */}
                            {Array.from({ length: item.rating }, (_, index) => (
                                <i className="fas fa-star" style={{ color: "navy" }} key={index}></i>
                            ))}
                            <span>{item.rating}
                                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet"></link>
                            </span>

                        </div>
                    )}
                </div>
                <div className="siDetailTexts">
                    <span className="siPrice">₹{item.cheapestPrice}</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="siCheckButton">Book Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;





