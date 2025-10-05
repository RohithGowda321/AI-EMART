import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styles.scss";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [referenceId] = useState(Date.now().toString());
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const showMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleGetOtp = async () => {
    if (!/^\d{10}$/.test(phone)) {
      showMessage("Please enter a valid 10-digit phone number", "error");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("http://3.7.8.162/aimart/public/api/auth/get-otp", {
        reference_id: referenceId,
        phone,
      });
      if (res?.data?.status === "success") {
        setStep(2);
        showMessage("OTP sent successfully", "success");
      } else {
        showMessage("Failed to send OTP", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (!otp.trim()) {
      showMessage("Please enter OTP", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("token", "dummy_token");
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="login-wrapper">
      {message && (
        <div className={`toast ${message.type}`} role="status" aria-live="polite">
          {message.text}
        </div>
      )}

      <div className="login-card" role="main" aria-labelledby="login-heading">
        <h2 id="login-heading">Welcome Back</h2>
        <p className="subtitle">Login with your mobile number</p>

        {step === 1 && (
          <div className="form-group">
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
              disabled={loading}
              aria-label="Phone number"
            />
            <button onClick={handleGetOtp} disabled={loading} aria-label="Get OTP">
              {loading ? <span className="loader" aria-hidden /> : "Get OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="form-group">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              disabled={loading}
              aria-label="OTP"
            />
            <button onClick={handleLogin} disabled={loading} aria-label="Login">
              {loading ? <span className="loader" aria-hidden /> : "Login"}
            </button>
          </div>
        )}

        <p className="switch-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} role="link" tabIndex={0}>
            Sign up
          </span>
        </p>

          <p className="switch-text">
          
          <span onClick={() => navigate("/")} role="link" tabIndex={0}>
            Home
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
