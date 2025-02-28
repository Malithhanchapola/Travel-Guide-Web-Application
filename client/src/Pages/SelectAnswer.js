import React, { useEffect, useState } from "react";
import Loginart from "../assets/Loginart.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAccommodations } from "../api/api";

function SelectAnswer() {
  const location = useLocation();
  const navigate = useNavigate();
  const category_locations = location.state;
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSelectAnswer = (event) => {
    console.log("selected", event.target.value);
    setSelectedAnswer(event.target.value); // Update the selected answer when an option is selected
  };
  const handleNext = async () => {
    try {
      const accoTypes = await getAccommodations({ location: selectedAnswer, category:localStorage.getItem('firstAnswer')});
      if (accoTypes.status === 200) {
        navigate("/accomdanswer", { state: { answer: accoTypes.data, location:selectedAnswer } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="quection-wrapper">
      <div className="qw-1">
        <div className="qw-2">
          <div className="signin10">
            <div className="signin11">
              <div className="signin111">Question Page 02</div>
              <div className="signin112"></div>
              <label className="quection" htmlFor="username">
                2.Select the Area?
              </label>
              {category_locations &&
                Object.entries(
                  category_locations.answers.category_locations
                )?.map(([locationName, locationData]) => (
                  <div className="field" key={locationName}>
                    <div className="ui radio checkbox quection-check">
                      <input
                        type="radio"
                        name="location"
                        value={locationName}
                        checked={selectedAnswer === locationName}
                        onChange={handleSelectAnswer} // Call handleSelectAnswer when an option is selected
                      />
                      <label>{locationName}</label>
                    </div>
                  </div>
                ))}
              <button onClick={handleNext} className="submit-que">
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="signin2">
          <img src={Loginart} alt="Login Art" />
        </div>
      </div>
    </div>
  );
}

export default SelectAnswer;
