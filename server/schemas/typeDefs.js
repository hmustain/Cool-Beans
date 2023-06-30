const { gql } = require("apollo-server-express");
// require graphql from apollo
//declare type definitions and mutations
const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    role: String
  }

  type ProductOrder {
  product: Product!
  quantity: Int!
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [ProductOrder]!
    total: Float
    status: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    me: User
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    userReviews(userId: ID!): [Review!]!
    reviews: [Review!]
  }

  type Category {
    _id: ID
    name: String
  }
  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
    reviews: [Review!]
  }

  type Review {
  _id: ID!
  user: User!
  comment: String!
  rating: Float!
  createdAt: String
  }

  input ReviewInput {
  comment: String!
  }
 
  input ProductInput{
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    category: ID!
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addProduct(product: ProductInput): Product
    addOrder(products: [ID]!, total: Float!, status: String!): Order
    login(email: String!, password: String!): Auth
    updateProduct(_id: ID!, quantity: Int!): Product
    createReview(_id: ID!, rating: Float!, review: ReviewInput!): Product
  }
`;

module.exports = typeDefs;
