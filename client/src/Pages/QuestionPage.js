import React, { useState } from "react";
import Loginart from "../assets/Loginart.png";
import { Link, useNavigate } from "react-router-dom";
import { getDestinations } from "../api/api";
import { useRecommendation } from "../contexts/RecommendationContext";

function QuestionPage() {
  const { setFirstAnswer } = useRecommendation();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleNext = async () => {
    try {
      // Send the selected answer to the backend via an API call
      const response = await getDestinations({ category: selectedAnswer });
      console.log("Answer sent successfully:", response);
      setFirstAnswer(selectedAnswer);
      localStorage.setItem("firstAnswer", selectedAnswer);
      // Redirect to the selectanswer page and pass the answers in the state
      navigate("/selectanswer", { state: { answers: response.data } });
    } catch (error) {
      console.error("Error sending answer:", error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div className="quection-wrapper">
      <div className="qw-1">
        <div className="qw-2">
          <div className="signin10">
            <div className="signin11">
              <div className="signin111">Question Page 01</div>
              <div className="signin112">
                Sign up today. Cover all your Favorite Places with us.
              </div>
              <label className="quection" htmlFor="username">
                1. What is your Preferred Travel Destination?
              </label>
              <div className="field">
                <div className="ui radio checkbox quection-check">
                  <input
                    type="radio"
                    name="name1"
                    value="Beach paradise"
                    checked={selectedAnswer === "Beach paradise"}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  />
                  <label>Beach Paradise</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox quection-check">
                  <input
                    type="radio"
                    name="name1"
                    value="Cultural adventure"
                    checked={selectedAnswer === "Cultural adventure"}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  />
                  <label>Cultural adventure</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox quection-check">
                  <input
                    type="radio"
                    name="name1"
                    value="Nature and wildlife"
                    checked={selectedAnswer === "Nature and wildlife"}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  />
                  <label>Nature and wildlife</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox quection-check">
                  <input
                    type="radio"
                    name="name1"
                    value="Urban exploration"
                    checked={selectedAnswer === "Urban exploration"}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  />
                  <label>Urban exploration</label>
                </div>
              </div>
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

export default QuestionPage;
