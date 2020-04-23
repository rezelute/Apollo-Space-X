import gql from "graphql-tag";
import LAUNCH_TILE_DATA from "./frag.launchTile";

const GET_LAUNCH = gql`
  query GetLaunch($launchId: ID!) {
    launch(id: $launchId) {
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default GET_LAUNCH;
