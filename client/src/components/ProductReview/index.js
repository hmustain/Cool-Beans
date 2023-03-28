import React, { useState, useEffect } from "react";

function productReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
          const response = await fetch("https://example.com/reviews");
          const reviewsData = await response.json();
          setReviews(reviewsData);
        }
        fetchReviews();
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review) => (
        <div key={review.id}>
          <div>{renderStars(review.rating)}</div>
          <div>{new Date(review.created_at).toLocaleDateString()}</div>
          <div>{review.text}</div>
          <div>{`${review.user.first_name} ${review.user.last_name}`}</div>
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

export default productReviews;