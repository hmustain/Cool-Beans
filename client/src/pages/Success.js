//import components/ utils and mutations/ react/ useeffect and jumbotron
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
//Sucess function that displays a page thanking user after sucessful purchase
function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  //resets cart on sucess purchase
  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }

      setTimeout(() => {
        window.location.assign('/home');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>
          Click <Link to="/home"> here</Link> to return home
        </h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
