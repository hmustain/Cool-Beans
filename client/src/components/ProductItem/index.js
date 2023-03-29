import React from "react";
import { Link } from "react-router-dom";
// import { pluralize } from "../../utils/helpers"
// import { useStoreContext } from "../../utils/GlobalState";
// import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
// import { idbPromise } from "../../utils/helpers";
function ProductItem(item) {
//   const [state, dispatch] = useStoreContext();
console.log(item,"here");
  const {
    image,
    description,
    name,
    _id,
    price,
    quantity,
    category,
    reviews,
  } = item;

//   const { cart } = state

//   const addToCart = () => {
//     const itemInCart = cart.find((cartItem) => cartItem._id === _id)
//     if (itemInCart) {
//       dispatch({
//         type: UPDATE_CART_QUANTITY,
//         _id: _id,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
//       });
//       idbPromise('cart', 'put', {
//         ...itemInCart,
//         purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
//       });
//     } else {
//       dispatch({
//         type: ADD_TO_CART,
//         product: { ...item, purchaseQuantity: 1 }
//       });
//       idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
//     }
//   }

  return (
    <div className="ProductItem">
    <div className="card">
      {/* <Link to={`/ProductItem/${_id}`}> */}
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <h3>{name}</h3>
      {/* </Link> */}
      <div>
        
        <div>{quantity}  in stock</div>
        <div>${price}</div>
        <div>Description: {description}</div>
        <div>{reviews?.length && reviews.map(review => {
            return <span> <br></br>Rating: {review.rating} </span>
        })}</div>
      </div>
      <button >Add to cart</button>
    </div>
    </div>
  );
}

export default ProductItem;