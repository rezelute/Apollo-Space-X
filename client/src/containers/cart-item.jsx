import React from "react";
import { useQuery } from "@apollo/react-hooks";
import LaunchTile from "../components/launch-tile";
import GET_LAUNCH from "../graphql/query.cartItemLaunch";

const CartItem = ({ launchId }) => {
  const { data, loading, error } = useQuery(GET_LAUNCH, { variables: { launchId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;

  return data && <LaunchTile launch={data.launch} />;
};

export default CartItem;
