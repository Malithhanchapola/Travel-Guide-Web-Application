import React, { useEffect, useState } from "react";
import Backimgone from "../assets/b-img-5.jpg";
import Card from "../Components/Card";
import {
  getDestinations,
  getRandomTransportation,
  getRecommendations,
} from "../api/api";
import { useAuth } from "../contexts/AuthContext";

function Transportation() {
  const { isUsingRecommendation } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllCards, setShowAllCards] = useState(false);
  const initialCardCount = 3; // Default number of cards to show initially
  const totalCount = 7; // Total number of cards available
  const [transportations, setTransportations] = useState([]);
  const [showMore, setShowMore] = useState({
    renting: false,
    cab: false,
    other: false,
  });

  const [cardCount, setCardCount] = useState(initialCardCount);

  useEffect(() => {
    fetchRecommendations();
  }, [isUsingRecommendation, localStorage.getItem("isUsingRecommendation")]);

  const fetchRecommendations = async () => {
    try {
      const test = isUsingRecommendation;

      if (!test) {
        // Fetch transportation
        console.log("inside the random");
        getRandomTransportation()
          .then((response) => {
            console.log(response, "random");
            setTransportations(response.data);
          })
          .catch((error) => {
            console.error("Error fetching transportation:", error);
          });
      } else {
        const destinationsResponse = await getDestinations({
          category: localStorage.getItem("firstAnswer"),
        });
        const recommendationsResponse = await getRecommendations({
          first:localStorage.getItem("firstAnswer"),
            third: localStorage.getItem("thirdAnswer"),
            second: localStorage.getItem("secondAnswer"),
        });
        if (recommendationsResponse.status === 200) {
          setTransportations(recommendationsResponse.data.transportation);
        }
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchQuery);
    setSearchQuery("");
  };

  const handleLoadMore = () => {
    setShowAllCards(true);
    setCardCount(totalCount); // Set card count to total count when loading more
  };

  const handleLoadLess = () => {
    setShowAllCards(false);
    setCardCount(initialCardCount); // Reset card count to initial count when loading less
  };

  return (
    <div className="trans-page-wrappper">
      <div className="home-image">
        <img src={Backimgone} alt="" />
        <div className="home-content">
          <h1>
            <span className="dot">.</span>Transportation
          </h1>
        </div>
      </div>
      <form className="search-container" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter your journey point"
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <h4 className="sub-title-one">Vehicle Renting</h4>
      <div className="own-card-area">
        <div
          className="own-cards-area"
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >{
          transportations.filter((transportation) =>transportation.name?.toLowerCase().includes("rent") ||transportation.Name?.toLowerCase().includes("rent")).length === 0 && (<p>No Vehicle Renting Service to be Displayed</p>)
        }
          {transportations
            .filter(
              (transportation) =>
                transportation.name?.toLowerCase().includes("rent") ||
                transportation.Name?.toLowerCase().includes("rent")
            )
            .map((transportation, index) => (
              <Card
                key={index}
                data={transportation}
                type="transportation"
                feature="rent"
              />
            ))}
          {transportations.filter(
            (transportation) =>
              transportation.name?.toLowerCase().includes("rent") ||
              transportation.Name?.toLowerCase().includes("rent")
          ).length > initialCardCount && !showMore.renting ? (
            <div className="load-more-btn-wrapper"></div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Cab Services */}
      <h4 className="sub-title-one">Cab Services</h4>
      <div className="own-card-area">
        <div
          className="own-cards-area"
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {transportations
            .filter(
              (transportation) =>
                transportation.name?.toLowerCase().includes("cab") ||
                transportation.name?.toLowerCase().includes("cabs") ||
                transportation.Name?.toLowerCase().includes("cab") ||
                transportation.Name?.toLowerCase().includes("cabs")
            ).length === 0 && <p>No Vehicle Cab Services to be Displayed</p> }
          {transportations
            .filter(
              (transportation) =>
                transportation.name?.toLowerCase().includes("cab") ||
                transportation.name?.toLowerCase().includes("cabs") ||
                transportation.Name?.toLowerCase().includes("cab") ||
                transportation.Name?.toLowerCase().includes("cabs")
            )
            .map((transportation, index) => (
              <Card
                key={index}
                data={transportation}
                type="transportation"
                feature="cab"
              />
            ))}
          {transportations.filter(
            (transportation) =>
              transportation.name?.toLowerCase().includes("cab") ||
              transportation.Name?.toLowerCase().includes("cab")
          ).length > initialCardCount && !showMore.cab ? (
            <div className="load-more-btn-wrapper"></div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Other Transportation */}
      <h4 className="sub-title-one">Other Transportation</h4>
      <div className="own-card-area">
        <div
          className="own-cards-area"
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {transportations
            .filter(
              (transportation) =>
                !(
                  transportation.name?.toLowerCase().includes("rent") ||
                  transportation.name?.toLowerCase().includes("cab") ||
                  transportation.Name?.toLowerCase().includes("rent") ||
                  transportation.Name?.toLowerCase().includes("cab")
                )
            ).length === 0 && <p>No Other Transportation to be Displayed</p>}
          {transportations
            .filter(
              (transportation) =>
                !(
                  transportation.name?.toLowerCase().includes("rent") ||
                  transportation.name?.toLowerCase().includes("cab") ||
                  transportation.Name?.toLowerCase().includes("rent") ||
                  transportation.Name?.toLowerCase().includes("cab")
                )
            )
            .map((transportation, index) => (
              <Card
                key={index}
                data={transportation}
                type="transportation"
                feature="other"
              />
            ))}
          {transportations.filter(
            (transportation) =>
              !(
                transportation.name?.toLowerCase().includes("rent") ||
                transportation.name?.toLowerCase().includes("cab") ||
                transportation.Name?.toLowerCase().includes("rent") ||
                transportation.Name?.toLowerCase().includes("cab")
              )
          ).length > initialCardCount && !showMore.other ? (
            <div className="load-more-btn-wrapper">
              
            </div>
          ) : (
           <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transportation;
