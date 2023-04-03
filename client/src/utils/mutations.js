import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
 mutation AddOrder($products: [ID]!, $total: Float!, $status: String!) {
  addOrder(products: $products, total: $total, status: $status) {
    _id
    products {
      product {
        _id
        category {
          name
        }
        description
        image
        name
        price
        quantity
        reviews {
          _id
          comment
          createdAt
          rating
          user {
            _id
            email
            firstName
            lastName
            password
          }
        }
      }
    }
    purchaseDate
    status
    total
  }
}
`;
export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT= gql`
 mutation AddProduct($product: ProductInput) {
  addProduct(product: $product) {
    _id
  }
}
`;