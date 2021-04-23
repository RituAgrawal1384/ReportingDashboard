// import React, { Component } from "react";
import React from "react";
import { Link } from "react-router-dom";

//stateless functional components

const NavBar = ({ totalCounters }) => {
  console.log("NavBar - Rendered");
  return (
    // <nav className="navbar navbar-light bg-light">
    //   <a className="navbar-brand" href="#test">
    //     Navbar{" "}
    //     <span className="badge badge-pill badge-secondary">
    //       {totalCounters}
    //     </span>
    //   </a>
    // </nav>

    //second option
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">Automation Report</span>
      {/* <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button> */}

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
