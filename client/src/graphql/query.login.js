import gql from "graphql-tag";

const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export default LOGIN_USER;
