import React, { Fragment, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
// import { Helmet } from "react-helmet";
import { Loading, Header, LaunchDetail } from "../components";
import { ActionButton } from "../containers";
import GET_LAUNCH_DETAILS from "../graphql/query.launchDetails";

// eslint-disable-next-line react/prop-types
const Launch = ({ launchId }) => {
  useEffect(() => {
    document.title = `Launch ${launchId}`;
  }, []);

  const { data, loading, error } = useQuery(GET_LAUNCH_DETAILS, {
    variables: { launchId },
  });

  console.log("launchId >> ", launchId);
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  console.log("...data.launch >> ", data);

  return (
    <Fragment>
      <Header image={data.launch && data.launch.mission && data.launch.mission.missionPatch}>
        {data && data.launch && data.launch.mission && data.launch.mission.name}
      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </Fragment>
  );
};

export default Launch;
