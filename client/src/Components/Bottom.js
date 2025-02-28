import React from "react";

function Bottom() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>About Us</h4>
            <p>We are a company dedicated to...</p>
          </div>
          <div className="col">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h4>Contact Us</h4>
            <p>Email: tripper@gmail.com</p>
            <p>Phone: +94112297303</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Bottom;
