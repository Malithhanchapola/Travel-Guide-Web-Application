import React from 'react'
import Backimgone from '../assets/b-img-4.jpg'

function CardLocation() {
  return (
    <div className="card-location">
      <div className="card-location-background">
        <img src={Backimgone} />
      </div>
      <div className="card-location-content">
        <p className="card-location-title">Nuwara Eliya</p>
      </div>
    </div>
  );
}
export default CardLocation;