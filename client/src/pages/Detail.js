import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
REMOVE_FROM_CART,
UPDATE_CART_QUANTITY,
ADD_TO_CART,
UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import { Nav } from 'react-bootstrap';
import Navtabs from '../components/NavTabs'
// import spinner from '../assets/spinner.gif';

function Detail() {
const [state, dispatch] = useStoreContext();
const { id } = useParams();
const stringId = String(id);
const { loading, data, error, refetch } = useQuery(QUERY_PRODUCT);
console.log(id);
const currentProduct = data?.product || [];
console.log(currentProduct);

useEffect(() => {
refetch({
id: id,
})},[]);
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
idbPromise('products', 'put', product);
});
}
// get cache from idb
else if (!loading) {
idbPromise('products', 'get').then((indexedProducts) => {
dispatch({
type: UPDATE_PRODUCTS,
products: indexedProducts,
});
});
}
}, [products, data, loading, dispatch, id]);

const addToCart = () => {
const itemInCart = cart.find((cartItem) => cartItem._id === id);
if (itemInCart) {
dispatch({
type: UPDATE_CART_QUANTITY,
_id: id,
purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
});
idbPromise('cart', 'put', {
...itemInCart,
purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
});
} else {
dispatch({
type: ADD_TO_CART,
product: { ...currentProduct, purchaseQuantity: 1 },
});
idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
}
};

const removeFromCart = () => {
dispatch({
type: REMOVE_FROM_CART,
_id: currentProduct._id,
});

idbPromise('cart', 'delete', { ...currentProduct });
};

return (
<>
<Navtabs/>
{currentProduct ? (
<div className="container my-1">
<Link to="/ShopAll">← Back to Products</Link>

<h2>{currentProduct.name}</h2>

<p>{currentProduct.description}</p>

<p>
<strong>Price:</strong>${currentProduct.price}{' '}
<button>Add to Cart</button>
<button
>
Remove from Cart
</button>
</p>

<img
src={`/images/${currentProduct.image}`}
alt={currentProduct.name}
/>
</div>
) : null}
{loading ? <p>loading..</p> : null}
<Cart />
<div>
hello
</div>
</>
);
}

export default Detail;