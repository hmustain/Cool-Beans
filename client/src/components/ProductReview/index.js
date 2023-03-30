import React, { useState, useEffect } from "react";
import "./style.css";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Nav from "../NavTabs";
import AddReview from "../AddReview";
import { displayAverageRating } from "../ProductItem";
// import ProductItem from "../ProductItem";

function ProductReviews() {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProductAndReviews() {
      console.log("productId", productId);
      const response = await fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          query ProductReviews($productId: ID! ) {
            product(_id: $productId) {
              _id
              name
              description
              price
              quantity
              category {
                name
              }
              image
              reviews {
                createdAt
                rating
                comment
                user {
                  email
                  firstName
                  lastName
                }
              }
            }
          }
        `,
          variables: { productId },
        }),
      });
      const data = await response.json();
      setProduct(data.data.product);
      setReviews(data.data.product.reviews);
    }
    fetchProductAndReviews();
  }, [productId]);

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <>
      <Nav />
      <div className="product-container">
        <div className="product-details-container">
          <div className="product-card">
            <div className="product-image">
              <img src={`/images/${product?.image}`} alt={product?.name} />
            </div>
            <div className="product-details">
              <h3>{product?.name}</h3>
              <p>{product?.description}</p>
              <div className="product-price">${product?.price}</div>
              {displayAverageRating(product?.reviews)}
            </div>
          </div>
        </div>
        <div className="reviews-container">
          {reviews.map((review) => (
            <Card key={review._id} className="my-3">
              <Card.Body>
                <Card.Title className="mb-2 font-weight-bold">
                  {`${review.user.firstName} ${review.user.lastName}`}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Card.Subtitle>
                <div>{renderStars(review.rating)}</div>
                <Card.Text className="mt-2">{review.comment}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

function renderStars(rating) {
  const filledStars = Array.from({ length: rating }, (_, i) => (
    <span key={i} className="filled-star">
      &#9733;
    </span>
  ));

  const unfilledStars = Array.from({ length: 5 - rating }, (_, i) => (
    <span key={i} className="unfilled-star">
      &#9734;
    </span>
  ));

  const stars = [...filledStars, ...unfilledStars];

  return <div>{stars}</div>;
}

export default ProductReviews;
