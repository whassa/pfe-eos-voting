const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    padding: theme.spacing(2),
  },
  list: {
    minHeight: "10vw",
    minWidth: "28vw",
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      paddingRight: 0,
      paddingBottom: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  icon: {
    color: theme.palette.colors.sunset,
    minWidth: "auto",
    marginRight: theme.spacing(1),
  },
  modal: {
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  votes: {
    display: "flex",
    flexDirection: "column",
  },
  divider: {
    backgroundColor: theme.palette.colors.nightfall,
  },
  item: {
    cursor: "pointer",
  },
});

export default styles;
