import React, { useState } from "react";
import NavTabs from "./NavTabs";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import ShopAll from "../pages/ShopAll";
export default function PortfolioContainer() {
  const [currentPage, setCurrentPage] = useState("Home");

  // const renderPage = () => {
  //   if (currentPage === "ShopAll") {
  //     return <ShopAll />;
  //   }
  //   if (currentPage === "Signup") {
  //     return <Signup />;
  //   }
  //   if (currentPage === "Contact") {
  //     return <Contact />;
  //   }
  //   // if (currentPage === "Shopping Cart") {
  //   //   return <Cart />;
  //   // }
  //   if (currentPage === "Login") {
  //     return <Login />;
  //   }
  //   // return <Contact />;
  // };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <div>
        <NavTabs
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
        {/* {renderPage()} */}
      </div>
      <div>{/* <Footer /> */}</div>
    </div>
  );
}
