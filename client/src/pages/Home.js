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
          <img className="d-block w-100 first-ad" />
          <Carousel.Caption>
            <h3>Free shipping on all orders over $50.</h3>
            <p>Try our premium roast coffee today.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block  w-100 second-ad" />

          <Carousel.Caption>
            <h3>
              Looking for the perfect cup of{" "}
              <a className="coffee-link" href="ShopAll">
                coffee
              </a>{" "}
              to start your day?
            </h3>
            <p>
              Our expertly sourced and roasted beans provide a rich and robust
              flavor that will satisfy any coffee lover.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="homepage-products">
        <div className="my-2 container ">
          <h2>See our highest rated products!</h2>
          {loading ? (
            <div>Data is loading</div>
          ) : (
            data?.products.length && (
              <div className="products">
                {data.products
                  .slice()
                  .sort((a, b) => {
                    const aRating =
                      a.reviews.reduce(
                        (acc, review) => acc + review.rating,
                        0
                      ) / a.reviews.length;
                    const bRating =
                      b.reviews.reduce(
                        (acc, review) => acc + review.rating,
                        0
                      ) / b.reviews.length;
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
      <div>
        <div className="logo-homepage">
          <img className="mx-auto second-logo"></img>
        </div>
        <section className="w-50 mx-auto text-center about-us">
          <h2>Hi, we are Kai, Caleb, and Hunter. This is our coffee.</h2>
          <p className="w-35 mx-auto ">
            Coffee. For some people (aka us), it’s more than a drink. It’s a way
            to connect. It’s a way to share moments. And, ok, sometimes it’s
            just a way to wake up and get stuff done.
          </p>
        </section>
        <section className="w-50 mx-auto text-center about-us">
          <h2>Created with love</h2>
          <p className="w-30 mx-auto ">
            At Cool Beans Coffee, we’re passionate about providing high quality,
            delicious beverages. So you can enjoy every sip, slurp and spill (it
            happens) with the knowledge that what you’re drinking isn’t just
            delicious, but also thoughtfully made. We are grateful to be a part
            of your daily routine, and we take it seriously. We believe that
            drinks can be more than just drinks, but sources of joy, inspiration
            and creativity in a cup.
          </p>
        </section>
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
