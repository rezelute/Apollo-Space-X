import React from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ApolloClient from "apollo-client";
import { LoginForm, Loading } from "../components";
import * as LoginTypes from "./__generated__/login";

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export default function Login() {
  const client: ApolloClient<any> = useApolloClient();
  const [login, { loading, error, data }] = useMutation<
    LoginTypes.login,
    LoginTypes.loginVariables
  >(LOGIN_USER, {
    // mutation completed > store login in localstorage
    onCompleted({ login }) {
      if (login !== null) {
        localStorage.setItem("token", login as string);
        client.writeData({ data: { isLoggedIn: true } });
      }
    }
  });

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  // console.log("login DATA: ", data);

  return <LoginForm login={login} loginData={data} />;
}
