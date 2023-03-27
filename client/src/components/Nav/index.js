import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
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
    <header>
      <div classname="header">
        <div>
          <h1>Coffee Brigade</h1>
        </div>
        <div>
          <i class="bi bi-cart3"></i>
          <i class="bi bi-person-circle"></i>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/home">Shop All</Link>
            </li>
            <li className="nav-item">
              <Link to="/home">Coffee Bags</Link>
            </li>
            <li className="nav-item">
              {" "}
              <Link to="/home">Single Serve</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* <nav> {showNavigation()}</nav> */}
    </header>
  );
}

export default Nav;
