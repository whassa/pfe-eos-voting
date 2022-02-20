import { makeStyles } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./navTab.css";

const useStyles = makeStyles(styles);

const propTypes = {
  value: PropTypes.any.isRequired,
  to: PropTypes.string.isRequired,
};

const NavTab = (props) => {
  const { link, ...classes } = useStyles();

  const a11yProps = {
    id: `scrollable-auto-tab-${props.value}`,
    "aria-controls": `scrollable-auto-tabpanel-${props.value}`,
  };

  return (
    <Link to={props.to} className={link}>
      <Tab {...props} {...a11yProps} classes={classes} disableRipple />
    </Link>
  );
};

NavTab.propTypes = propTypes;

export default NavTab;
