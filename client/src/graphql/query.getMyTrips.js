import gql from "graphql-tag";
import LAUNCH_TILE_DATA from "./frag.launchTile";

const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default GET_MY_TRIPS;
