import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddReview({ productId, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <div>
      <h2>Add a Review</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Rating:</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            onChange={(event) => setRating(parseInt(event.target.value))}
          >
            <option value={0}>Select a rating...</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Comment:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </Form.Group>
        <Button type="submit" disabled={!rating}>
          Submit Review
        </Button>
      </Form>
    </div>
  );
}

export default AddReview;
