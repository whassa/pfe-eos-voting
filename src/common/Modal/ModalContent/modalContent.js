import DialogContent from "@mui/material/DialogContent";
import { makeStyles } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import styles from "./ModalContent.css";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const useStyles = makeStyles(styles);

const ModalContent = ({ children }) => {
  const classes = useStyles();

  return (
    <DialogContent dividers className={classes.root}>
      {children}
    </DialogContent>
  );
};

ModalContent.propTypes = propTypes;
ModalContent.defaultProps = defaultProps;

export default ModalContent;
