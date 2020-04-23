import gql from "graphql-tag";
import LAUNCH_TILE_DATA from "./frag.launchTile";

const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      isInCart @client
      id
      site
      isBooked
      rocket {
        id
        name
        type
      }
      mission {
        name
        missionPatch
      }
    }
  }
`; // returns Type Launch

// const GET_LAUNCH_DETAILS = gql`
//   query LaunchDetails($launchId: ID!) {
//     launch(id: $launchId) {
//       isInCart @client
//       site
//       rocket {
//         type
//       }
//       ...LaunchTile
//     }
//   }
//   ${LAUNCH_TILE_DATA}
// `;

export default GET_LAUNCH_DETAILS;
