import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Loginart from '../assets/Loginart.png';
import { register } from '../api/api';

function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords don't match. Please make sure your passwords match.");
        return;
      }

      const response = await register({
        username,
        email,
        password,
      });
      // Handle successful registration
      console.log('Registration successful:', response);
      if(response.status === 201) {
        navigate("/login")
      }
      
    } catch (error) {
      // Handle registration error
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="signin">
      <div className="signin0">
        <div className="signin1">
          <div className="signin10">
            <div className="signin11">
              <div className="signin111">Sign Up / Register</div>
              <div className="signin112">Sign up today. Cover all your Favorite Places with us.</div>
              <div className="signin113">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                  className="signinput"
                />
              </div>
              <div className="signin113">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="signinput"
                />
              </div>
              <div className="signin113">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
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
                  placeholder="Your password"
                  className="signinput"
                />
              </div>
              <div className="signin113">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="signinput"
                />
              </div>
              {error && <div className="signin-error">{error}</div>}
              <button onClick={handleRegister} className="signin115">
                Sign up
              </button>
            </div>
            <div className="signin14">
              Already have an account?{' '}
              <Link to="/login" className="sss" style={{ textDecoration: 'none' }}>
                Sign in
              </Link>
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

export default Register;
