import React from "react";
import image1 from "../assets/b-img-2.jpg";
import Car from "../assets/car.png";
import Hotel from "../assets/hotel.png";
import Walking from "../assets/walking.png";
import defaultTransportImage from "../assets/traveldefault.jpg";
import defaultRentImage from "../assets/rentdefaultimage.png";
import defaultCabImage from "../assets/cabsdefault.jpg";
import defaultAccommodationImage from "../assets/otherdefaultaccommodation.jpg";
import restDefault from "../assets/restdefault.jpg";
import villaDefault from "../assets/villadefaukt.jpg";
import hospitalDefault from "../assets/hospitalDefault.jpg";
import policeDefault from "../assets/policeDefault.jpg";
import { reviews } from "../constants/reviews";

function Card({ data, type, feature }) {
  function getDestinationReviews(destinationName) {
    console.log(destinationName);
    // Check if the destination name exists in the reviews object
    if (reviews.hasOwnProperty(destinationName)) {
      // Return the first three reviews for the destination
      return reviews[destinationName].slice(0, 3);
    } else {
      // If the destination name is not found, return an empty array
      return [];
    }
  }

  const capitalizeAddress = (address) => {
    const words = address?.split(" ");

    const capitalizedWords = words?.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalizedWords?.join(" ");
  };

  const getImageForDestination = (destination) => {
    try {
      // Dynamically import all images in the assets directory
      const images = require.context("../assets", false, /\.(jpg)$/);

      // Find the image file name that includes the destination name
      const matchingImage = images
        .keys()
        .find((image) =>
          image.toLowerCase().includes(destination.toLowerCase())
        );

      if (matchingImage) {
        return images(matchingImage);
      }

      // If no matching image is found, return a default image
      return require("../assets/defaultdestination.jpeg");
    } catch (error) {
      // If any error occurs, return a default image
      return require("../assets/defaultdestination.jpeg");
    }
  };

  return (
    <>
      {type === "transportation" && (
        <div className="card">
          <div className="card-header">
            <img
              className="image-style"
              src={
                feature === "other"
                  ? defaultTransportImage
                  : feature === "cab"
                  ? defaultCabImage
                  : feature === "rent"
                  ? defaultRentImage
                  : null
              }
            />
          </div>
          <div className="title-rating">
            <h2>
              {data.Name} {data.name}
            </h2>
            <div className="rating">
              <span className="star">&#9733;</span>
              <p className="rating-number">{(Math.random() * 5).toFixed(1)}</p>
            </div>
          </div>
          <div className="card-middle">
            <p>
              {data.District}
              {data.district}
            </p>
          </div>
          <div className="card-guidlines">
            <ul>
              <li>Reviews: {data.review}</li>
            </ul>
          </div>
          <div className="price-card">{data.price}</div>
        </div>
      )}

      {type === "accommodation" && (
        <div className="card">
          <div className="card-header">
            <img
              className="image-style"
              src={
                feature === "other"
                  ? defaultAccommodationImage
                  : feature === "rest"
                  ? restDefault
                  : feature === "villa"
                  ? villaDefault
                  : null
              }
            />
          </div>
          <div className="title-rating">
            <h2>
              {data.Name}
              {data.name}
            </h2>
            <div className="rating">
              <span className="star">&#9733;</span>
              <p className="rating-number">
                {data.Grade?.toLowerCase()}
                {data.grade?.toLowerCase()}
              </p>
            </div>
          </div>
          <div className="card-middle">
            <p>
              {data.District}
              {data.district}
            </p>
          </div>

          <div className="card-guidlines">
            <ul>
              <li>
                Address: {capitalizeAddress(data.Address?.toLowerCase())}
                {capitalizeAddress(data.address?.toLowerCase())}
              </li>
            </ul>
          </div>
          <div className="price-card">
            ${Math.floor(Math.random() * (200 - 50 + 1)) + 50}
            <span className="label-price">Per Adult</span>
          </div>
        </div>
      )}
      {type === "destination" && (
        <div className="card">
          <div className="card-header">
            <img
              src={
                data.Destination
                  ? getImageForDestination(data.Destination)
                  : getImageForDestination(data.name)
              }
              alt=""
              className="image-style"
            />
          </div>
          <div className="title-rating">
            <h2>
              {data.Destination} {data.name}
            </h2>
            <div className="rating">
              <span className="star">&#9733;</span>
              <p className="rating-number">
                {data.Rating}
                {data.rating}
              </p>
            </div>
          </div>
          <div className="card-middle">
            <p>
              {data["Destination Type"]} {data["destination_type"]} -{" "}
              {data.District}
              {data.district}
            </p>
            <p style={{fontWeight:"bold"}}>
              Reviews
            </p>
            <div
              className="card-guidlines"
              style={{
                paddingLeft: "7px",
                maxHeight: "200px",
                overflow: "scroll",
                overflowX: "hidden",
              }}
            >
              <ul style={{ listStyleType: "disc" }}>
                {data.Destination
                  ? getDestinationReviews(data.Destination).map(
                      (item, index) => (
                        <li
                          key={index}
                          style={{ display: "list-item"}}
                        >
                          &#8226;{item}
                        </li>
                      )
                    )
                  : getDestinationReviews(data.name).map((item, index) => (
                      <li key={index} style={{ display: "list-item" }}>
                        &#8226; {item}
                      </li>
                    ))}
              </ul>
            </div>
          </div>
          <div className="card-body">
            <div className="image-group">
              <img className="icon-card" src={Hotel} />
              <h3>{Math.floor(Math.random() * 10) + 1}</h3>
            </div>
            <div className="image-group">
              <img src={Car} />
              <h3>{Math.floor(Math.random() * 10) + 1}</h3>
            </div>
            <div className="image-group">
              <img src={Walking} />
              <h3>{Math.floor(Math.random() * 10) + 1}</h3>
            </div>
          </div>
          <div className="price-card"></div>
        </div>
      )}
      {type === "hospital" && (
        <div className="card">
          <div className="card-header">
            <img className="image-style" src={hospitalDefault} />
          </div>
          <div className="title-rating">
            <h2>
              {data.Name} {data.name}
            </h2>
          </div>
          <div className="card-middle">
            <p>
              {data.District}
              {data.district}
            </p>
          </div>
          <div className="card-guidlines">
            <ul>
              <li>Contact: {data.contact}</li>
            </ul>
          </div>
          <div className="price-card">{data.price}</div>
        </div>
      )}
      {type === "police" && (
        <div className="card">
          <div className="card-header">
            <img className="image-style" src={policeDefault} />
          </div>
          <div className="title-rating">
            <h2>{data.police_station} Police Station</h2>
          </div>

          <div className="card-guidlines">
            <ul>
              <li>Province :{data.province}</li>
              <li>Division: {data.division}</li>
            </ul>
            <ul>
              <li>Contact: {data.contact}</li>
            </ul>
          </div>
          <div className="price-card">{data.price}</div>
        </div>
      )}
    </>
  );
}

export default Card;
