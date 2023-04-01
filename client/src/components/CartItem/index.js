import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import '../../styles/cartitem.css'
import { Link } from 'react-router-dom'
const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <Link to={`/Product/${item._id}`}>

        <img
          src={`/images/${item.image}`}
          alt=""
        />
        </Link>
      </div>
      <div>
        <div>
          {item.name}: ${item.price}
        </div>
        <div>
          <span className='Qty'>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="button"
            aria-label="trash"
            className='trashcan'
            onClick={() => removeFromCart(item)}
            className="pe-auto"
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
