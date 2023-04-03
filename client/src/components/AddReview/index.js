import React, { useState } from "react";
//import react/usestate from react
import { ADD_REVIEW } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
//Add review function that takes in productid, userid and onsubmit
import { useParams } from "react-router-dom";
function AddReview({  userId, onSubmit }) {
  //declare variables with functions to change them. seting default value with useState.
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [ CreateReview ] = useMutation( ADD_REVIEW );
  const { productId } = useParams()
  //on form submit handles data and resets rating and comment states.
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("productId is", productId, rating, comment);
    await CreateReview({ variables: {productId, rating, review:{comment}} });
    setRating(1);
    setComment("");
  };
  // rendered component
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <select
          placeholder="custom-select"
          className="form-control"
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>
      <div className="form-group">
        <br />
        <textarea
          placeholder="Leave a review :)"
          className="form-control"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          cols="50"
        />
      </div>
      <button type="submit" className="btn btn-dark d-flex flex-end m-1">
        Submit
      </button>
    </form>
  );
}

export default AddReview;
