//import gql from apollo
import { gql } from '@apollo/client';
//ceclare querys for getting data
//declare query for getting products
export const QUERY_PRODUCTS = gql`
 query getProducts($category: ID) {
  products(category: $category) {
    _id
    name
    description
    price
    quantity
    image
    reviews {
      _id
      user {
        _id
        firstName
        lastName
      }
      rating
      comment
    }
    category {
      _id
    }
  }
}
`;
//declare query for getting checkout
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
//declare query for getting all products
export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;
//declare query for getting categorys
export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;
//declare query for getting user info
export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
//declare query for getting me that has user info
export const QUERY_ME = gql`
{
me {
_id
firstName
lastName
role
email
password
}
}`;

export const GET_USER_REVIEWS = gql`
query ReviewsByUser($userId: ID!) {
  userReviews(userId: $userId) {
    _id
    user {
      _id
      firstName
      lastName
      email
      password
      role
    }
    comment
    rating
    createdAt
  }
}
`;


//declare query for getting a product
export const QUERY_PRODUCT = gql`
query Product($id: ID!) {
product(_id: $id) {
_id
name
description
image
quantity
price
category {
    _id
    name
         }
reviews  {
user {
  _id
  firstName
  lastName
  email
  password
  role
     }
         }
  }
}`

