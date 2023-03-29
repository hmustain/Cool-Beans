import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  console.log(item,"here");
  // const [state, dispatch] = useStoreContext();
  const {
    image,
    description,
    name,
    _id,
    price,
    // quantity = 1,
    // category = "coffee",
    reviews,
  } = item;
  console.log('image', image);
  console.log('description', description);
  console.log('name', name);
  console.log('_id', _id);
  console.log('price', price);
  // console.log('quantity', quantity);
  // console.log('category', category);
  console.log('reviews', reviews);

  // const { cart } = state

  // const addToCart = () => {
  //   const itemInCart = cart.find((cartItem) => cartItem._id === _id)
  //   if (itemInCart) {
  //     dispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: _id,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
  //     });
  //     idbPromise('cart', 'put', {
  //       ...itemInCart,
  //       purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
  //     });
  //   } else {
  //     dispatch({
  //       type: ADD_TO_CART,
  //       product: { ...item, purchaseQuantity: 1 }
  //     });
  //     idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
  //   }
  // }

  return (
    <div className="card px-1 py-1">
      <Link to={`/ProductItem/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
      {/* <div>{quantity} {pluralize("item", quantity)} in stock</div> */}
        <span>${price}</span><br></br>
        <span>${description}</span>
        <span>{displayAverageRating(reviews)}</span>
      </div>
      {/* <button onClick={addToCart} >Add to cart</button> */}
    </div>
  );
}

function displayAverageRating(reviews) {
  if (!reviews || !reviews.length) {
    return null;
  }

  const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = totalRating / reviews.length;

  return (
    <div>
      {averageRating.toFixed(1)} ({reviews.length})
    </div>
  );
}


export default ProductItem;