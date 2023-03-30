import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import "./style.css";
function Products() {
  //   const [state, dispatch] = useStoreContext();

  //   const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  //   useEffect(() => {
  //     if (data) {
  //       dispatch({
  //         type: UPDATE_PRODUCTS,
  //         products: data.products,
  //       });
  //       data.products.forEach((product) => {
  //         idbPromise("products", "put", product);
  //       });
  //     } else if (!loading) {
  //       idbPromise("products", "get").then((products) => {
  //         dispatch({
  //           type: UPDATE_PRODUCTS,
  //           products: products,
  //         });
  //       });
  //     }
  //   }, [data, loading, dispatch]);

  //   function filterProducts() {
  //     if (!currentCategory) {
  //       return state.products;
  //     }

  //     return state.products.filter(
  //       (product) => product.category._id === currentCategory
  //     );
  //   }

  return (
    <div className="my-2 container ">
      <h2>Our Products:</h2>
      {loading ? (
        <div>Data is loading</div>
      ) : (
        data?.products.length && (
          <div className="products">
            {data.products.map((product) => (
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
