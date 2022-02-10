import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import React from "react";

import Cards from "./Cards/index";
import useStyles from "./listView.css";

const propTypes = {
  resolutions: PropTypes.array.isRequired,
  elevation: PropTypes.number,
};

const defaultProps = {
  elevation: 1,
};

const ListView = ({ resolutions, elevation }) => {
  const classes = useStyles();
  return resolutions ? (
    <Grid className={classes.root} container spacing={3}>
      {resolutions.map((el, index) => {
        return (
          <Cards
            resolution={el}
            key={index}
            id={el.id}
            elevation={elevation}
            isLast={index !== resolutions.length - 1}
          />
        );
      })}
    </Grid>
  ) : null;
};

ListView.propTypes = propTypes;
ListView.defaultProps = defaultProps;

export default ListView;
