import React from "react";
import "./Styles.scss";
import Navbar from "../../Components/Navbar";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header */}
      <Navbar/>

      {/* Main Content Area */}
      <main className="homepage__main">
        <section className="homepage__section placeholder">
          <h2>Welcome Section</h2>
          <p>This is where content will go.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="homepage__footer">
        <p>© {new Date().getFullYear()} My Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
