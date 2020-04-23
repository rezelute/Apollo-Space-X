import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Loading, Header, LaunchTile } from "../components";
import GET_MY_TRIPS from "../graphql/query.getMyTrips";

const Profile = () => {
  const { data, loading, error } = useQuery(GET_MY_TRIPS, { fetchPolicy: "network-only" });
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? (
        data.me.trips.map((launch) => <LaunchTile key={launch.id} launch={launch} />)
      ) : (
        <p>You havent booked any trips</p>
      )}
    </Fragment>
  );
};

export default Profile;
