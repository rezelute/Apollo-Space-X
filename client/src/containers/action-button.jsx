import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import TOGGLE_CART from "../graphql/mutations/mut.addOrRemoveFromCart";
import CANCEL_TRIP from "../graphql/mutations/mut.cancelTrip";
import GET_LAUNCH_DETAILS from "../graphql/query.launchDetails";
import Button from "../components/button";

const ActionButton = ({ isBooked, id, isInCart }) => {
  const [mutate, { loading, error }] = useMutation(isBooked ? CANCEL_TRIP : TOGGLE_CART, {
    variables: { launchId: id },
    refetchQueries: [
      {
        query: GET_LAUNCH_DETAILS,
        variables: { launchId: id },
      },
    ],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <Button onClick={() => mutate()} data-testid={"action-button"}>
        {isBooked ? "Cancel This Trip" : isInCart ? "Remove from Cart" : "Add to Cart"}
      </Button>
    </div>
  );
};

ActionButton.propTypes = {
  isBooked: PropTypes.bool,
  id: PropTypes.string,
  isInCart: PropTypes.bool,
};

export default ActionButton;
