import gql from "graphql-tag";
import LAUNCH_TILE_DATA from "./frag.launchTile";

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default GET_LAUNCHES;
