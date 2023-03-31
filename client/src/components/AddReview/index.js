import React, { useState } from "react";

function AddReview({ productId, userId, onSubmit }) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({ productId, userId, rating, comment });
    setRating(1);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add Review</h4>
      <div>
        <label htmlFor="rating">Rating:</label>
        <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          cols="50"
        />
      </div>
      <input type="submit" value="Submit"/>
    </form>
  );
}

export default AddReview;
