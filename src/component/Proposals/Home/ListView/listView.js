import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import React from "react";

import Cards from "./Cards/index";

const propTypes = {
  resolutions: PropTypes.array.isRequired,
  elevation: PropTypes.number,
};

const defaultProps = {
  elevation: 1,
};


const ListView = ({ resolutions, elevation, cardOnClick }) => {
  return resolutions ? (
    <Grid container spacing={3} sx={{marginTop: '5px', flexGrow: 1}}>
      {resolutions.map((el, index) => {
        return (
          <Cards
            resolution={el}
            key={index}
            id={el.id}
            elevation={elevation}
            isLast={true}
            cardOnClick={cardOnClick}
          />
        );
      })}
    </Grid>
  ) : null;
};

export default ListView;
