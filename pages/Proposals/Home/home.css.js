/* eslint-disable */
import { makeStyles, withStyles } from "@mui/styles";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    fontSize: 20,
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
      justifyContent: "space-between",
    },
  },
  selectInput: {
    backgroundColor: "white",
    minWidth: 56,
  },
  sort: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  showDraft: {
    marginRight: 16,
  },
  sortBySelection: {
    marginLeft: "1rem",
    backgroundColor: "white",
  },
  disposition: {
    marginLeft: 80,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      marginLeft: 30,
    },
  },
  proposalContainer: {
    display: "flex",
  },
  mainContainer: {
    maxWidth: "66%",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
    },
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  filterToolbox: {
    width: "33%",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  formControl: {
    width: "100%",
    marginTop: "2rem",
  },
  mobileToolbar: {
    display: 'flex',
      justifyContent: 'flex-end',
  },
  mobileDrawer: {
    padding: 16,
  },
  removeFilters: {
    marginTop: "2.5rem",
  }
}));

const AntTabs = withStyles({
  root: {
    backgroundColor: "transparent",
  },
  indicator: {
    backgroundColor: "#e38360",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 30,
    "&:hover": {
      color: "#e3836050",
      opacity: 1,
    },
    "&$selected": {
      color: "#e38360",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#e38360",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

export { useStyles, AntTabs, AntTab };
