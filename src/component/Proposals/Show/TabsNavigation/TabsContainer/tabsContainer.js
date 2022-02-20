import { makeStyles } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import React from "react";

import styles from "./tabsContainer.css";

const useStyles = makeStyles(styles);

const TabsContainer = (props) => {
  const classes = useStyles();

  return (
    <Tabs
      {...props}
      classes={classes}
      scrollButtons="auto"
      variant="scrollable"
      TabIndicatorProps={{ children: <div /> }}
    />
  );
};

export default TabsContainer;
