//import util/ link and styles and of course react again
import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import "../styles/header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//Nav function that renders a page based on what List item was clicked using Link from react-router
//also include header logo
function Navs(props) {
  const { currentPage, handlePageChange } = props;
  //if user is logged in then reder these nav items like logout option
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Navbar expand="lg" className="peanuts">
          <Container className="navbar-sticky">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto navbar-nav">
                <Nav.Link className="nav-item" href="/home">
                  Home
                </Nav.Link>
                <Nav.Link className="nav-item" href="/ShopAll">
                  Shop All
                </Nav.Link>
                <Nav.Link className="nav-item" href="/Contact">
                  Contact Us
                </Nav.Link>
                <Nav.Link
                  className="nav-item"
                  href="/Home"
                  onClick={() => Auth.logout()}
                >
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    } else {
      //if user isnt logged in then display these nav items like login
      return (
        <Navbar expand="md" className="mx-auto">
          <Container className="navbar-mobile">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto me-auto mb-2 mb-lg-0">
                <Nav.Link className="nav-item" href="/home">
                  Home
                </Nav.Link>
                <Nav.Link className="nav-item" href="/ShopAll">
                  Shop All
                </Nav.Link>
                <Nav.Link className="nav-item" href="/Contact">
                  Contact Us
                </Nav.Link>
                <Nav.Link className="nav-item" href="/Signup">
                  Join Here
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
  }
  //function to change icon in the top left from Profile to log if user is logged in or not
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
            <div className="login-text" href="/Login">
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
    <div className="mainheader">
      <div className="subscribe">
        <p>
          <a className="join-save" href="login">
            Join{" "}
          </a>{" "}
          and Save!
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
    </div>
  );
}
export default Navs;
