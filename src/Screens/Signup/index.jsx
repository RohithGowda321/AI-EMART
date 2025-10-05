import React, { useState } from "react";
import "./Styles.scss";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    gender: "",
    work_status: "",
    monthly_income: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch("http://3.7.8.162/aimart/public/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Signup failed");

      const data = await response.json();
      setMessage({ text: "Signup successful!", type: "success" });
      console.log("API Response:", data);

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        gender: "",
        work_status: "",
        monthly_income: ""
      });

    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup__container">
      <form className="signup__form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="form-group">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <div className="custom-select">
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="custom-select">
            <select name="work_status" value={formData.work_status} onChange={handleChange} required>
              <option value="">Select Work Status</option>
              <option value="Job (Private)">Job (Private)</option>
              <option value="Job (Government)">Job (Government)</option>
              <option value="Business">Business</option>
              <option value="Student">Student</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <div className="custom-select">
            <select
              name="monthly_income"
              value={formData.monthly_income}
              onChange={handleChange}
              required
            >
              <option value="">Select Monthly Income</option>
              <option value="0-10000">0-10000</option>
              <option value="10001-25000">10001-25000</option>
              <option value="25001-500000">25001-500000</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <span className="loader"></span> : "Signup"}
        </button>
 <p className="switch-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/login")} role="link" tabIndex={0}>
            Log in
          </span>
        </p>


         <p className="switch-text">
         
          <span onClick={() => navigate("/")} role="link" tabIndex={0}>
            Home
          </span>
        </p>
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </form>
      
    </div>
  );
};

export default Signup;
