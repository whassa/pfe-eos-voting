import { Snackbar as MaterialSnackBar } from "@mui/material";
import Alert from "@mui/lab/Alert";
import PropTypes from "prop-types";
import React from "react";

const propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  severity: PropTypes.string,
};

const defaultProps = {
  message: "",
  onClose: null,
  open: false,
  severity: "",
};

const SnackbarAlert = ({ severity, open, onClose, message }) => (
  <MaterialSnackBar
    autoHideDuration={6000}
    open={open}
    onClose={onClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
  >
    <Alert onClose={onClose} severity={severity} elevation={6} variant="filled">
      {message}
    </Alert>
  </MaterialSnackBar>
);

SnackbarAlert.propTypes = propTypes;
SnackbarAlert.defaultProps = defaultProps;

SnackbarAlert.severity = {
  info: "info",
  warning: "warning",
  error: "error",
  success: "success",
};

export default SnackbarAlert;
