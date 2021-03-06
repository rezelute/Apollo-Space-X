import React from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";
import { unit } from "../styles";
import { cardClassName, getBackgroundImage } from "./launch-tile";

const LaunchDetail = ({ id, site, rocket }) => (
  <Card
    style={{
      backgroundImage: getBackgroundImage(id),
    }}
  >
    <h3>
      {rocket && rocket.name} ({rocket && rocket.type})
    </h3>
    <h5>{site}</h5>
  </Card>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Card = styled("div")(cardClassName, {
  height: 365,
  marginBottom: unit * 4,
});

LaunchDetail.propTypes = {
  id: PropTypes.string,
  site: PropTypes.string,
  rocket: PropTypes.object,
};

export default LaunchDetail;
