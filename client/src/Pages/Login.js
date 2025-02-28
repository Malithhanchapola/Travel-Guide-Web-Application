import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loginart from "../assets/Loginart.png";
import { login } from "../api/api";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(email, password);
      // Handle successful login
      console.log("Login successful:", response);
      if (response.status === 200) {
        setEmail("");
        setPassword("");
        setShowModal(true);
      }
    } catch (error) {
      // Handle login error, e.g., display error message
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", error);
    }
  };

  const handleGoToQuestions = () => {
    navigate("/questionPage"); // Navigate to the questions page
    setShowModal(false); // Close the modal
  };

  const handleGoToHome = () => {
    navigate("/"); // Navigate to the home page
    setShowModal(false); // Close the modal
  };

  return (
    <div className="signin">
      <div className="signin0">
        <div className="signin1">
          <div className="signin10">
            <div className="signin11">
              <div className="signin111">Login</div>
              <div className="signin112">
                Today is a new day. It's your day. You shape it. Sign in to
                start managing your trips .
              </div>
              <div className="signin113">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Example@email.com"
                  className="signinput"
                />
              </div>
              <div className="signin113">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="at least 8 characters"
                  className="signinput"
                />
                <Link to="/forgot-password" className="signin114">
                  Forgot password?
                </Link>
              </div>
              {error && <div className="signin-error">{error}</div>}
              <button onClick={handleLogin} className="signin115">
                Sign in
              </button>
            </div>

            <div className="signin14">
              <span>Don't you have an account? </span>
              <Link to="/register" className="regi-link">
                Register
              </Link>
            </div>
          </div>
        </div>
        <div className="signin2">
          <img src={Loginart} alt="Login Art" />
        </div>
      </div>
      {/* Popup Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Do you want to go with the recommendation system?</h2>
            <button onClick={handleGoToQuestions}>Yes</button>
            <button onClick={handleGoToHome}>
              No, Take me to the home page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
