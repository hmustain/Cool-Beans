import React from "react";
import Products from "../components/Products";
import Nav from "../components/NavTabs";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import "../styles/ShopAll.css";
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
