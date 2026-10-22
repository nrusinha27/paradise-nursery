import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  // Controls whether the landing page or product list is displayed.
  const [showProductList, setShowProductList] = useState(false);

  // Displays the product list when the user clicks Get Started.
  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        // Landing page with the nursery name and welcome message.
        <div className="landing-page">
          <div className="background-image"></div>

          <div className="content">
            <h1>Welcome To Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>

            {/* Button that opens the product listing page. */}
            <button
              className="get-started-btn"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>

          {/* Displays information about Paradise Nursery. */}
          <AboutUs />
        </div>
      ) : (
        // Shows available plants after Get Started is clicked.
        <ProductList />
      )}
    </div>
  );
}

export default App;
