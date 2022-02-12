import { Dialog as MaterialModal } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
};

const defaultProps = {
  children: null,
  size: "md",
};

const Modal = (props) => {
  const { children, size, ...modalProps } = props;

  return (
    <MaterialModal
      {...modalProps}
      disableEscapeKeyDown
      maxWidth={size}
      fullWidth
      scroll="body"
    >
      {children}
    </MaterialModal>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
