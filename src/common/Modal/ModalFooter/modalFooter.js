import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import React from "react";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const ModalFooter = ({ children }) => <DialogActions>{children}</DialogActions>;

ModalFooter.propTypes = propTypes;
ModalFooter.defaultProps = defaultProps;

export default ModalFooter;
