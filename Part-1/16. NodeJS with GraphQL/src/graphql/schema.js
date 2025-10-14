// This file will tell that what will be the structure of your data
// It's like the controller in the REST API

const gql = require("graphql-tag");

// Data types that graphQL provides
// String
// Int
// Float
// Boolean
// ID -> an unique identifier

// ! means required field
// type Query means =>
// Its like the controllers in REST API
// Each function aas it's own controller, like addData,fetchData,fetchDataById
const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    category: String!
    price: Float!
    inStock: Boolean!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(
      title: String!
      category: String!
      price: Float!
      inStock: Boolean!
    ): Product
    deleteProduct(id:ID!):Boolean
     updateProduct(
      id: ID!
      title: String
      category: String
      price: Float
      inStock: Boolean
    ): Product
  }
`;

module.exports = { typeDefs };
