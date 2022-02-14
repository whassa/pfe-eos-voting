import { Avatar, DialogTitle, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

const defaultProps = {
  subtitle: null,
};

const ModalHeader = ({ title, subtitle, image }) => (
  <DialogTitle disableTypography>
    {image ? (
      <React.Fragment>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Avatar variant="square" src={image} />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    ) : (
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
    )}
    {subtitle && (
      <Typography variant="subtitle1" component="p">
        {subtitle}
      </Typography>
    )}
  </DialogTitle>
);

ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;

export default ModalHeader;
