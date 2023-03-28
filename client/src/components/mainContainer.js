import React, { useState } from "react";
import NavTabs from "./NavTabs";

export default function PortfolioContainer() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    if (currentPage === "Shop All") {
      return <ShopAll />;
    }
    if (currentPage === "Join") {
      return <Signup />;
    }
    if (currentPage === "Contact Us") {
      return <Contact />;
    }
    if (currentPage === "Shopping Cart") {
      return <Cart />;
    }
    return <Contact />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <div>
        <NavTabs
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
        {renderPage()}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
