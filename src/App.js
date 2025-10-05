// import './App.css';
// import HomePage from './Screens/Home';

// function App() {
//   return (
//     <div className="App">
//    <HomePage/>
//     </div>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Screens/Home";
import LoginPage from "./Screens/Login";
import SignupPage from "./Screens/Signup";
// import Dashboard from "./Screens/Dashboard";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        {!isAuthenticated && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </>
        )}

        {/* Protected routes */}
        {isAuthenticated && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Redirect unknown routes */}
        {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
}

export default App;
