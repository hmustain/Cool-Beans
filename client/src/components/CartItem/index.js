import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import "../../styles/cartitem.css";
//cart item component that represents all the single items in the cart
const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();
  //function that handels removing single item from cart onclick
  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };
  //onchange events for the QTY. if QTY = 0 remove it from cart else update the cart quantity
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
        <img src={`/images/${item.image}`} alt="" />
      </div>
      <div>
        <div>
          {item.name}: ${item.price}
        </div>
        <div>
          <span className="Qty">Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="button"
            aria-label="trash"
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
