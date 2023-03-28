import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import "../styles/header.css";

function Nav(props) {
  const {currentPage, handlePageChange} = props;
  //   function showNavigation() {
  //     if (Auth.loggedIn()) {
  //       return (
  //         <ul className="flex-row">
  //           <li className="mx-1">
  //             {/* this is not using the Link component to logout or user and then refresh the application to the start */}
  //             <a href="/" onClick={() => Auth.logout()}>
  //               Logout
  //             </a>
  //           </li>
  //         </ul>
  //       );
  //     } else {
  //       return (
  //         <ul className="flex-row">
  //           <li className="mx-1">
  //             <Link to="/signup">Signup</Link>
  //           </li>
  //         </ul>
  //       );
  //     }
  //   }

  return (
    <>
      <div className="subscribe">
        <p>
          <a>Join </a> and Save!
        </p>
      </div>
      <div className="icons">
        <i className="bi bi-cart4"></i>
        <div id="icons"  href="#Login"
                    onClick={() => handlePageChange("Login")}
                    className={
                      currentPage === "Login" ? "nav-link active" : "nav-link"
                    }><span className="bi bi-person-circle"></span></div>
      </div>
      <p className="brand-name" ><a
                    href="#Home"
                    onClick={() => handlePageChange("Home")}
                    className={
                      currentPage === "Home" ? "nav-link active" : "nav-link"
                    }
                  >
                    Coffee Brigade
                  </a></p>
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
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a
                    href="#ShopAll"
                    onClick={() => handlePageChange("ShopAll")}
                    className={
                      currentPage === "ShopAll" ? "nav-link active" : "nav-link"
                    }
                  >
                    Shop All
                  </a>
                </li>
                {/* <li className="nav-item">
              <a className="nav-link" href="#about" onClick={() => handlePageChange('About')}>About</a>
            </li> */}
                <li className="nav-item">
                  <a
                    href="#Contact"
                    onClick={() => handlePageChange("Contact")}
                    className={
                      currentPage === "Contact" ? "nav-link active" : "nav-link"
                    }
                  >
                    Contact Us
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#Signup"
                    onClick={() => handlePageChange("Signup")}
                    className={
                      currentPage === "Join" ? "nav-link active" : "nav-link"
                    }
                  >
                    Join Here
                  </a>
                </li>
              </ul>
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
