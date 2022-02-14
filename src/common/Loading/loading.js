import { CircularProgress, makeStyles } from "@mui/material";
import React from "react";

import styles from "./Loading.css";

const useStyles = makeStyles(styles);

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
