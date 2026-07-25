import React from "react";

const PageNotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <button
          className="home-btn"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;