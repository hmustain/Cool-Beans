import React from "react";
import Products from "../components/Products";
import Nav from "../components/NavTabs";
// import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import "../styles/ShopAll.css";
const ShopAll = () => {
  return (
    <div className="ShopAllcontainer">
      {/* <CategoryMenu /> */}
      <Nav />
      <div>
        <Products />
      </div>
      <Cart />
    </div>
  );
};

export default ShopAll;
