// import React, { Component } from "react";
import React from "react";
import { Link } from "react-router-dom";

//stateless functional components

const NavBar = ({ totalCounters }) => {
  console.log("NavBar - Rendered");
  // const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div class="navbar-header">
        <span className="navbar-brand">Automation Report</span>
        {/* <button
          class="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span class="navbar-toggler-icon"></span>
        </button> */}
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      {/* <div
        class={'${isNavCollapsed ? "collapse" : ""} navbar-collapse'}
        id="navbarNavAltMarkup"
      > */}
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link active" to="/Home">
            Home
          </Link>
          <Link className="nav-item nav-link" to="/Regression">
            Regression
          </Link>
          <Link className="nav-item nav-link" to="/Steps">
            Steps KPIs
          </Link>
          <Link className="nav-item nav-link" to="/Failure">
            Failure Analysis
          </Link>
          <Link className="nav-item nav-link" to="/Detailed">
            Detailed Report
          </Link>
        </div>
        {/* <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form> */}
      </div>
    </nav>
  );
};

export default NavBar;
