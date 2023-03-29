import React, { useState, useEffect } from "react";
import "./style.css"
import { Card } from 'react-bootstrap';

function ProductReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              reviews {
                createdAt
                rating
                comment
                user {
                  firstName
                  lastName
                }
              }
            }
          `
        })
      });
      const reviewsData = await response.json();
      console.log('reviewsData:', reviewsData);
      setReviews(reviewsData.data.reviews);
    }
    fetchReviews();
  }, []);

  return (
    <div className="review-container">
      {/* <h1>Reviews</h1> */}
      {reviews.map((review) => (
        <Card key={review.id} className="my-3 col-sm-12 col-md-10 col-lg-8">
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
  );
}

function renderStars(rating) {
    const filledStars = Array.from({ length: rating }, (_, i) => (
      <span key={i} className="filled-star">&#9733;</span>
    ));
  
    const unfilledStars = Array.from({ length: 5 - rating }, (_, i) => (
      <span key={i} className="unfilled-star">&#9734;</span>
    ));
  
    const stars = [...filledStars, ...unfilledStars];
  
    return <div>{stars}</div>;
  }
  



export default ProductReviews;
