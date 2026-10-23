
import React from "react";
import "./App.css";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";

function App() {
  const [started, setStarted] = React.useState(false);

  return (
    <div className="app-container">
      {!started ? (
        <div className="landing-page">
          <div className="background-image"></div>

          <div className="content">
            <div className="landing_content">
              <h1>Paradise Nursery</h1>

              <p>
                Where Green Meets Serenity
              </p>

              <button
                className="get-started-button"
                onClick={() => setStarted(true)}
              >
                Get Started
              </button>
            </div>

            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
