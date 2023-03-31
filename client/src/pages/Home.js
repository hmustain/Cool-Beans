import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { QUERY_PRODUCTS } from "../utils/queries";
import ProductItem from "../components/ProductItem";
import { useQuery } from "@apollo/client";
import Nav from "../components/NavTabs";
import "../styles/home.css";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel w-100 mx-auto">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img className="d-block w-100 first-ad" alt="First slide" />
          <Carousel.Caption>
            <h3>Free shipping on all orders over $50.</h3>
            <p>Try our premium roast coffee today.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block  w-100 second-ad" alt="Second slide" />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block  w-100 third-ad" alt="Third slide" />

          <Carousel.Caption>
            <h3>Reach out!</h3>
            <p>Contact us if you have any special requests</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="my-2 container ">
        <h2>Our Products:</h2>
        {loading ? (
          <div>Data is loading</div>
        ) : (
          data?.products.length && (
            <div className="products">
              {data.products
                .slice()
                .sort((a, b) => {
                  const aRating =
                    a.reviews.reduce((acc, review) => acc + review.rating, 0) /
                    a.reviews.length;
                  const bRating =
                    b.reviews.reduce((acc, review) => acc + review.rating, 0) /
                    b.reviews.length;
                  return bRating - aRating;
                })
                .slice(0, 3)
                .map((product) => (
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
    </div>
  );
}

const Home = () => {
  return (
    <>
      <Nav />
      <ControlledCarousel />
    </>
  );
};

export default Home;
