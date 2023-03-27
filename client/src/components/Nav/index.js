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
    <header className="flex-row px-1">
      <h1>
        <ul>
          <li>
            <Link to="/home">Shop All</Link>
          </li>
          <li>
            <Link to="/home">Cart</Link>
          </li>
          <li>
            {" "}
            <Link to="/home">Single Serve</Link>
          </li>
        </ul>
      </h1>

      {/* <nav> {showNavigation()}</nav> */}
    </header>
  );
}

export default Nav;
