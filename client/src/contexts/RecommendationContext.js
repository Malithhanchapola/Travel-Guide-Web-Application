import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getDestinations, getRecommendations } from "../api/api";

const RecommendationContext = createContext();

export const RecommendationProvider = ({ children }) => {
  const { isUsingRecommendation } = useAuth();
  const [firstAnswer, setFirstAnswer] = useState([]);
  const [secondAnswer, setSecondAnswer] = useState([]);
  const [thirdAnswer, setThirdAnswer] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const callRecommendations = async () => {
      try {
        if (isUsingRecommendation) {
          await getDestinations({ category: localStorage.getItem("firstAnswer")});
          const response = await getRecommendations({
            category: localStorage.getItem("thirdAnswer"),
            location: localStorage.getItem("secondAnswer"),
          });
          if (response.status === 200) {
            setRecommendations(response.data,'hehehehehehhhhhhhhhhhhhhhhhhhhhhhhhh');
            localStorage.setItem("recommendations", response.data)
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    callRecommendations();
  },[]);

  const updateRecommendations = (newRecommendations) => {
    localStorage.setItem("isUsingRecommendation", true);
    console.log("hehe mn wada", newRecommendations);
    setRecommendations(newRecommendations);
  };

  return (
    <RecommendationContext.Provider
      value={{
        recommendations,
        updateRecommendations,
        firstAnswer,
        setFirstAnswer,
        secondAnswer,
        setSecondAnswer,
        thirdAnswer,
        setThirdAnswer,
      }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendation = () => useContext(RecommendationContext);
