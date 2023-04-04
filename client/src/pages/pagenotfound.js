//import components/and animated robot./ link for linking back to homepage/ styles
import React from "react";
import { render } from "react-dom";
import { Samy, SvgProxy } from "react-samy-svg";
import RobotAnimated from "../styles/robot-animated"
import "../styles/pagenotfound.css"
import { Link } from "react-router-dom";
<<<<<<< HEAD
//cool animated react page that displays robot when page cant be found
//has a link that leads use back to home page
function pagenotfound() {
  return (
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
=======
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
>>>>>>> 1c9d0b7142e421508b9ac0a7280719fb83131021
}
export default Pagenotfound;
