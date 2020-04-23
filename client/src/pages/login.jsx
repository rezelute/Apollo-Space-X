import React from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
// import ApolloClient from "apollo-client";
import { LoginForm, Loading } from "../components";
import LOGIN_USER from "../graphql/query.login";

const Login = () => {
  const client = useApolloClient();
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    // eslint-disable-next-line no-shadow
    onCompleted({ login }) {
      localStorage.setItem("token", login);
      client.writeData({ data: { isLoggedIn: true } });
    },
  });
  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
};

export default Login;
