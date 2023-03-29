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

// export const ADD_ORDER = gql`
//   mutation addOrder(
//     $name: String!
//     $description: String
//     $image: String!
//     $quantity: Int!
//     $price: Float!
//     $category: ID!
//   ) {
//     addOrder(
//       name: $name
//       description: $description
//       image: $image
//       quantity: $quantity
//       price: $price
//       category: $category
//     ) {
//       products
//       total
//       status
//       _id
//       name
//       description
//       image
//       quantity
//       price
//       category {
//         _id
//         name
//       }
//     }
//   }
// `;
