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
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      // Fetch the authenticated user's ID and set it in state
      const response = await fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          query: `
            query Me {
              me {
                _id
              }
            }
          `,
        }),
      });
      const { data } = await response.json();
      setUser(data.me._id);
    }
    fetchUser();
  }, []);

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

  const handleAddReview = async (review) => {
    const response = await fetch("http://localhost:3001/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        query: `
          mutation AddReview($productId: ID!, $rating: Int!, $comment: String!) {
            addReview(productId: $productId, rating: $rating, comment: $comment) {
              _id
              createdAt
              rating
              comment
              user {
                _id
                email
                firstName
                lastName
              }
            }
          }
        `,
        variables: {
          productId,
          rating: review.rating,
          comment: review.comment,
        },
      }),
    });
    const data = await response.json();
    setReviews([...reviews, data.data.addReview]);
  };
  return (
    <>
      <Nav />
      <div className="product-container">
        <div className="product-details-container">
          <div className="product-card">
            <h3>{product?.name}</h3>
            <div className="product-image">
              <img src={`/images/${product?.image}`} alt={product?.name} />
            </div>
            <div className="product-details ">
              {/* <p>{product?.description}</p> */}
              <p>Average Rating: {displayAverageRating(product?.reviews)}</p>

              <AddReview
                productId={productId}
                userId={user}
                onSubmit={handleAddReview}
              />
              {/* <div className="product-price">${product?.price}</div> */}
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
      </div>
    </>
  );
}

export function renderStars(averageRating) {
  const filledStarsCount = Math.floor(averageRating);
  const percentageFilled = (averageRating - filledStarsCount) * 100;

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < filledStarsCount) {
      stars.push(
        <span key={i} className="filled-star">
          &#9733;
        </span>
      );
    } else if (i === filledStarsCount && percentageFilled > 0) {
      stars.push(
        <span key={i} className="partially-filled-star">
          &#9733;
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="unfilled-star">
          &#9733;
        </span>
      );
    }
  }
  return <div>{stars}</div>;
}

export default ProductReviews;
