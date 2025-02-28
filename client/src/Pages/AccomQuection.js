import React, { useState } from "react";
import Loginart from "../assets/Loginart.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getRecommendations,
  updateUserPreference,
  updateUserUsingRecommendations,
} from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import { useRecommendation } from "../contexts/RecommendationContext";

function AccomQuection() {
  const { updateRecommendations, setSecondAnswer, setThirdAnswer } =
    useRecommendation();
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsUsingRecommendation } = useAuth();
  const answer = location?.state.answer; // Get the selected answer from the previous page
  const selectedLocation = location?.state.location;
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const first = localStorage.getItem("firstAnswer");
  const handleSelectAnswer = (event) => {
    console.log(event.target.value);
    setSelectedAnswer(event.target.value); // Update the selected answer
  };

  const handleNext = async () => {
    try {
      // Send both selected answers to the backend via an API call
      const response = await getRecommendations({
        first: first,
        third: selectedAnswer,
        second: selectedLocation,
      });

      if (response.status === 200) {
        updateRecommendations(response.data);
        setIsUsingRecommendation(true);
        localStorage.setItem("secondAnswer", selectedLocation);
        localStorage.setItem("thirdAnswer", selectedAnswer);
        setSecondAnswer(answer);
        setThirdAnswer(selectedAnswer);
        await updateUserPreference({
          email: localStorage.getItem("userEmail"),
          first_answer: localStorage.getItem("firstAnswer"),
          second_answer: selectedLocation,
          third_answer: selectedAnswer,
        });
        await updateUserUsingRecommendations({
          email: localStorage.getItem("userEmail"),
          is_using_recommendation: true,
        });
        navigate("/");
      }
      console.log("Answers sent successfully:");
    } catch (error) {
      console.error("Error sending answers:", error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div className="quection-wrapper">
      <div className="qw-1">
        <div className="qw-2">
          <div className="signin10">
            <div className="signin11">
              <div className="signin111">Question Page 03</div>
              <label className="quection" htmlFor="username">
                3.What type of accommodation do you prefer ?
              </label>
              {answer?.map((answer, index) => (
                <div className="field">
                  <div className="ui radio checkbox quection-check">
                    <input
                      type="radio"
                      name={answer}
                      value={answer}
                      checked={selectedAnswer === answer}
                      onChange={handleSelectAnswer}
                    />
                    <label>{answer}</label>
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

export default AccomQuection;
