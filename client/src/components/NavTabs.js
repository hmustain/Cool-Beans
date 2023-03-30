import React from "react";
import Auth from "../utils/auth";
import { Link,  } from "react-router-dom";
import "../styles/header.css";

function Nav(props) {
  const { currentPage, handlePageChange } = props;
    function showNavigation() {
      if (Auth.loggedIn()) {
        return (
          <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link to="/ShopAll">
              <p  className={
                currentPage === "/ShopAll" ? "nav-link active" : "nav-link"
              }>Shop All</p>
            </Link>
          </li>
          {/* <li className="nav-item">
        <a className="nav-link" href="#about" onClick={() => handlePageChange('About')}>About</a>
      </li> */}
          <li className="nav-item">
            <Link to="/Contact">
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
              <Link>
              <p className="nav-link"
                href="/logout" onClick={() => Auth.logout()}>
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
            <Link to="/ShopAll">
              <p  className={
                currentPage === "/ShopAll" ? "nav-link active" : "nav-link"
              }>Shop All</p>
            </Link>
          </li>
          {/* <li className="nav-item">
        <a className="nav-link" href="#about" onClick={() => handlePageChange('About')}>About</a>
      </li> */}
          <li className="nav-item">
            <Link to="/Contact">
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
          <Link to="/Signup">
            <p  className={
                currentPage === "/Signup" ? "nav-link active" : "nav-link"
              }>
              Join Here
            </p>
            </Link>
          </li>
          
        </ul>
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
      <div className="icons">
      <i className="bi bi-cart4"></i>
         <Link to="/login">
         <div id="icons" href="/Login">
          <span id="icons"
          href="/Login"   className="bi bi-person-circle"></span>
        </div>
            </Link>
        
        
        
      </div>
      <div className="logo">
        <img className="cool-beans"></img>
      </div>
      <header id="header">
        <nav className="navbar navbar-expand-lg ">
          <div className="container justify-content-center">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
             {showNavigation()}
            </div>
          </div>
        </nav>
      </header>
    </>
  );

  /* <Link to="/home">Single Serve</Link> */

  /* <nav> {showNavigation()}</nav> */
}
export default Nav;
