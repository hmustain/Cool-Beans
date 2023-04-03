//import components/ State effect/ utils querys etc
//cart imported but not used on this page
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "../styles/singleproduct.css";
import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCT } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import Navtabs from "../components/NavTabs";

//detail page that displays a single product with details about that product
function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const stringId = String(id);
  const { loading, data, error, refetch } = useQuery(QUERY_PRODUCT);
  const currentProduct = data?.product || [];


  useEffect(() => {
    refetch({
      id: id,
    });
  }, []);
  // const [currentProduct, setCurrentProduct] = useState({});

  // const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      // setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);
  //addtocart currently not being used
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };
  //remove from cart currently not being used
  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", { ...currentProduct });
  };

  return (
    <div className="singleproduct">
      <Navtabs />
      {currentProduct ? (
        <div className="card rounded-5 bg-lighttext-secondary ">
          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>
          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
          <p>
            <strong>Price:</strong>${currentProduct.price} <br></br>
            <button className="btn btn-dark">Add to Cart</button>
          </p>
          <Link to="/ShopAll">← Back to Products</Link>
        </div>
      ) : null}
      {loading ? <p>loading..</p> : null}
      <Cart />
    </div>
  );
}

export default Detail;
