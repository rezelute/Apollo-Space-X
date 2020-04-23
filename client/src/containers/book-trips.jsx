import React from "react";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import Button from "../components/button";
import GET_LAUNCH from "../graphql/query.cartItemLaunch";
import BOOK_TRIPS from "../graphql/mutations/mut.bookTrips";

const BookTrips = ({ cartItems }) => {
  const [bookTrips, { data }] = useMutation(BOOK_TRIPS, {
    variables: { launchIds: cartItems },
    refetchQueries: cartItems.map((launchId) => ({
      query: GET_LAUNCH,
      variables: { launchId },
    })),
    update(cache) {
      cache.writeData({ data: { cartItems: [] } });
    },
  });

  return data && data.bookTrips && !data.bookTrips.success ? (
    <p data-testid="message">{data.bookTrips.message}</p>
  ) : (
    <Button onClick={() => bookTrips()} data-testid="book-button">
      Book All
    </Button>
  );
};

BookTrips.propTypes = {
  cartItems: PropTypes.object.isRequired,
};

export default BookTrips;
