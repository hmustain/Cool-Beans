//import react / components and style sheet
import React from "react";
import Products from "../components/Products";
import Nav from "../components/NavTabs";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import "../styles/ShopAll.css";
//renders nav category and products component in shop all page
const ShopAll = () => {
  return (
    <>
      <Nav />
      <div className="ShopAllcontainer">
        <CategoryMenu />
        <div>
          <Products />
        </div>
        <Cart />
      </div>
    </>
  );
};

export default ShopAll;
