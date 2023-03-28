import React, { useState, useEffect } from "react";

function ProductReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch("https://example.com/reviews", {
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
          <div>{new Date(review.createdAt).toLocaleDateString()}</div>
          <div>{review.comment}</div>
          <div>{`${review.user.firstName} ${review.user.lastName}`}</div>
        </div>
      ))}
    </div>
  );
}

function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? "star-filled" : "star-empty"}>
        &#9734;
      </span>
    );
  }
  return <div>{stars}</div>;
}

export default ProductReviews;
