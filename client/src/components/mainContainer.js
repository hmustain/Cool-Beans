import React, { useState } from "react";

export default function PortfolioContainer() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    if (currentPage === "home") {
      return <Home />;
    }
    if (currentPage === "L") {
      return <Portfolio />;
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
