import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import "../styles/header.css";

function Nav(props) {
  const { currentPage, handlePageChange } = props;
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to="/Home"
            >
              <p
                className={
                  currentPage === "/Home" ? "nav-link active" : "nav-link"
                }
              >
                Home
              </p>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to="/ShopAll"
            >
              <p
                className={
                  currentPage === "/ShopAll" ? "nav-link active" : "nav-link"
                }
              >
                Shop All
              </p>
            </Link>
          </li>
          {/* <li className="nav-item">
        <a className="nav-link" href="#about" onClick={() => handlePageChange('About')}>About</a>
      </li> */}
          <li className="nav-item">
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to="/Contact"
            >
              <p
                href="/Contact"
                className={
                  currentPage === "/Contact" ? "nav-link active" : "nav-link"
                }
              >
                Contact Us
              </p>
            </Link>
          </li>
          <li className="nav-item">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <Link style={{ color: "inherit", textDecoration: "inherit" }}>
              <p
                className="nav-link"
                href="/logout"
                onClick={() => Auth.logout()}
              >
                Logout
              </p>
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to="/Home"
            >
              <p
                className={
                  currentPage === "/Home" ? "nav-link active" : "nav-link"
                }
              >
                Home
              </p>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/ShopAll"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <p
                id="shop"
                className={
                  currentPage === "/Contact" ? "nav-link active" : "nav-link"
                }
              >
                Shop All
              </p>
            </Link>
          </li>
          {/* <li className="nav-item">
        <a className="nav-link" href="#about" onClick={() => handlePageChange('About')}>About</a>
      </li> */}
          <li className="nav-item">
            <Link
              to="/Contact"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <p
                href="/Contact"
                className={
                  currentPage === "/Contact" ? "nav-link active" : "nav-link"
                }
              >
                Contact Us
              </p>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Signup"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <p
                className={
                  currentPage === "/Signup" ? "nav-link active" : "nav-link"
                }
              >
                Join Here
              </p>
            </Link>
          </li>
        </ul>
      );
    }
  }
  function showprofile() {
    if (Auth.loggedIn()) {
      return (
        <div className="icons">
          <Link to="/profile">
            <div id="icons" href="/Login">
              <span
                id="icons"
                href="/profile"
                className="bi bi-person-circle"
              ></span>
              Profile
            </div>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="icons">
          <Link to="/login">
            <div id="icons" href="/Login">
              <span
                id="icons"
                href="/Login"
                className="bi bi-person-circle"
              ></span>
              Login
            </div>
          </Link>
        </div>
      );
    }
  }
  return (
    <>
      <div className="subscribe">
        <p>
          <a>Join </a> and Save!
        </p>
      </div>

      {showprofile()}

      <div className="logo">
        <img className="cool-beans"></img>
      </div>
      <header id="header">
        <nav className="navbar navbar-expand-lg ">
          <div className="container justify-content-center">
            <div id="navbarNav">{showNavigation()}</div>
          </div>
        </nav>
      </header>
    </>
  );

  /* <Link to="/home">Single Serve</Link> */

  /* <nav> {showNavigation()}</nav> */
}
export default Nav;
