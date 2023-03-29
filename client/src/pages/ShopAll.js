import React from "react";
import ProductList from "../components/Products";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";
import '../styles/ShopAll.css'
const ShopAll= () => {
  return (
    <div className="container">
      {/* <CategoryMenu /> */}
      <div>
      <ProductList />
      </div>
      {/* <Cart /> */}
    </div>
  );
};

export default ShopAll;
