import React, { useState } from "react";
import "./Styles.scss";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">AI Emart</div>

        {/* Desktop Menu */}
        <nav className={`navbar__menu ${isOpen ? "open" : ""}`}>
          <a href="#home">Home</a>
          <a href="#offline">Offline Expenses</a>
          <a href="#online">Online Expenses</a>
          <a href="#bills">Bills, Recharge & Payments</a>
          <a href="#buy">Buy & Sell</a>
          <a href="#faq">FAQs</a>
          <div className="navbar__buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </nav>

        {/* Hamburger Button */}
        <div className="navbar__toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="navbar__overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Navbar;
