import React from "react";
import { render } from "react-dom";
import { Samy, SvgProxy } from "react-samy-svg";
import RobotAnimated from "../styles/robot-animated"
import "../styles/pagenotfound.css"
import { Link } from "react-router-dom";
function Pagenotfound(){
return(
  <div>
  <div className="robotdiv">
    <RobotAnimated />
    <h1>Beep Boop...Wrong Page</h1>
    
  </div>
  <Link to="/Home">
  <h2>back to home</h2>
  </Link>
  </div>
)
}
export default Pagenotfound;
