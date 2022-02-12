const styles = (theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    userSelect: "none",
    width: "auto",
  },
  icon: {
    alignContent: "center",
    alignItems: "center",
    color: "#d66c44",
  },
  comments: {
    marginTop: 30,
    marginBottom: 30,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  comment_votes: {
    right: 16,
  },
  voteArrows: {
    "&:hover": {
      color: theme.palette.action.hover,
    },
  },
  button: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
});

export default styles;
