import React, { useState, useEffect } from "react";
import "./style.css"

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
    <div>
      <h1>Reviews</h1>
      {reviews.map((review) => (
        <div key={review.id}>
          <div>{renderStars(review.rating)}</div>
          <div>{review.comment}</div>
          <div>{`${review.user.firstName} ${review.user.lastName}`}</div>
          <div>{new Date(review.createdAt).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
}

const rating = 0; 

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
