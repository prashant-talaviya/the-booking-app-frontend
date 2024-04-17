import React from "react";
import { Link } from "react-router-dom";
import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("/hotels");

  // Slice the data array to get only the first 5 items
  const firstFiveHotels = data.slice(25, 30);

  return (
    <div className="fp">
      {loading ? (
        "Loading Please Wait"
      ) : (
        <>
          {firstFiveHotels.map((item) => (
            <Link className="hotel" to={`/hotels/${item._id}`} key={item._id}>
              <div className="fpItem">
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ₹ {item.cheapestPrice}</span>
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
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
