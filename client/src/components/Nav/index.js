import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "../../styles/header.css";
import { COffcanvas } from "@coreui/bootstrap-react";
import { COffcanvasHeader } from "@coreui/bootstrap-react";
import { COffcanvasTitle } from "@coreui/bootstrap-react";
import { COffcanvasBody } from "@coreui/bootstrap-react";
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
  const [visibleScrolling, setVisibleScrolling] = useState(false);
  const [visibleWithBackdrop, setVisibleWithBackdrop] = useState(false);
  const [visibleWithBothOptions, setVisibleWithBothOptions] = useState(false);
  return (
    <header>
      <CButton onClick={() => setVisible(true)}>Toggle offcanvas</CButton>
      <COffcanvas
        placement="start"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <COffcanvasHeader>
          <COffcanvasTitle>Offcanvas</COffcanvasTitle>
          <CCloseButton
            className="text-reset"
            onClick={() => setVisible(false)}
          />
        </COffcanvasHeader>
        <COffcanvasBody>
          Content for the offcanvas goes here. You can place just about any
          Bootstrap React component or custom elements here.
        </COffcanvasBody>
      </COffcanvas>
    </header>
  );
}
{
  /* <Link to="/home">Single Serve</Link> */
}
{
  /* <nav> {showNavigation()}</nav> */
}
export default Nav;
