import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Cards from "./Cards/cards";

const propTypes = {
  resolutions: PropTypes.array.isRequired,
  elevation: PropTypes.number,
};

const defaultProps = {
  elevation: 1,
};

const GridView = ({ resolutions, elevation, cardOnClick }) => {
  return resolutions ? (
    <Grid container spacing={3} sx={{marginTop: '5px', flexGrow: 1}}>
      {resolutions.map((el, index) => {
        return (
          <Cards
            resolution={el}
            key={index}
            id={el.id}
            elevation={elevation}
            isLast={index !== resolutions.length - 1}
            cardOnClick={cardOnClick}
          />
        );
      })}
    </Grid>
  ) : null;
};

GridView.propTypes = propTypes;
GridView.defaultProps = defaultProps;

export default GridView;
