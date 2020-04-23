import gql from "graphql-tag";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export { IS_LOGGED_IN, GET_CART_ITEMS };
