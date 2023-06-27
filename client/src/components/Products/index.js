//import components/ utils /styles / use effect and usequery
import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import "./style.css";
//Products component that displays all products or filters by category
function Products() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  //updates products
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);
  //filterProducts function that returns all products if there is no currentcategory selected or renders all products in a certain category based on what current category is
  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }
  
    return state.products.filter((product) => {
      if (product.category && product.category._id) {
        return product.category._id === currentCategory;
      }
      return false;
    });
  }

  return (
    <div className="my-2 container ">
      <h2 id="producthead">Our Products:</h2>
      {loading ? (
        <div>Data is loading...</div>
      ) : (
        state.products.length && (
          <div className="products">
            {filterProducts().map((product) => (
              <ProductItem
                key={product._id}
                _id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                description={product.description}
                reviews={product.reviews}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default Products;
