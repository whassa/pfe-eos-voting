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
    color: theme.palette.secondary.main,
  },
  paper: {
    padding: theme.spacing(2),
  },
  vote: {
    right: theme.spacing(2),
    textAlign: "center",
    alignContent: "center",
  },
  voteArrows: {
    "&:hover": {
      color: theme.palette.action.hover,
      cursor: "pointer",
      fontWeight: 900,
    },
  },
  content: {
    overflowWrap: "anywhere",
  },
  tagPadding: {
    paddingRight: 5,
  },
  authorTag: {
    userSelect: "none",
    textAlign: "left",
    color: "rgba(0,0,0,0.5)",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    paddingRight: "0.5rem",
    paddingLeft: "0.5rem",
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
    borderColor: "rgba(0,0,0,0.5)",
  },
  authorName: {
    color: "rgba(0,0,0,0.5)",
  },
  highlightedArrow: {
    color: "rgba(255,255,255,0.75)",
    backgroundColor: "rgba(200, 0,0,0.75)",
  },
});

export default styles;
