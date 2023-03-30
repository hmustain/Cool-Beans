import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import "./style.css";
import { renderStars } from "../ProductReview";

function ProductItem(item) {
  console.log(item, "here");
  const [state, dispatch] = useStoreContext();
  const {
    image,
    description,
    name,
    _id,
    price,
    quantity = 1,
    category = "coffee",
    reviews,
  } = item;
  // console.log("image", image);
  // console.log("description", description);
  // console.log("name", name);
  // console.log("_id", _id);
  // console.log("price", price);
  // console.log('quantity', quantity);
  // console.log('category', category);
  // console.log("reviews", reviews);

  const { cart } = state
  console.log('page loading:', state)

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="product pt-5 col-xs-12 col-sm-8 col-md-8 col-lg-3 ">
      <div className="product-detail">
        <Link to={`/Product/${_id}`}>
          <img alt={name} src={`/images/${image}`} />
          <p>{name}</p>
        </Link>
        {/* <div>{quantity} {pluralize("item", quantity)} in stock</div> */}
        <span>${price}</span>
        <br />

        <div className="add-cart">
          <button onClick={addToCart} className="btn btn-dark w-50 mx-auto">Add To Cart</button>
          <Link to={`/product/${_id}/reviews`} productId={_id}>
            See All Reviews <br />
            {displayAverageRating(reviews)}
            <br />
          </Link>
        </div>
      </div>
      {/* <button onClick={addToCart} >Add to cart</button> */}
    </div>
  );
}
export function displayAverageRating(reviews) {
  if (!reviews || !reviews.length) {
    return null;
  }

  const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = totalRating / reviews.length;
  const filledStars = Math.floor(averageRating);
  const unfilledStars = 5 - filledStars;

  return (
    <div>
      {renderStars(averageRating)}
      <span style={{ marginLeft: '0.5rem', color: 'blue', fontSize: '0.8rem' }}>
        ({averageRating.toFixed(1)})
      </span>
    </div>
  );
}

export default ProductItem;
