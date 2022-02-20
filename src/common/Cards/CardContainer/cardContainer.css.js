const styles = (theme) => ({
  root: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  fromAuthor: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  avatar: {},
  title: {
    textAlign: "left",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "bold",
  },
  authorTag: {
    userSelect: "none",
    textAlign: "left",
    color: theme.palette.colors.sunset,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(10),
    fontWeight: "bold",
    padding: 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 2,
    borderColor: theme.palette.colors.sunset,
  },
  deletedTitle: {
    textAlign: "left",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "bold",
    fontStyle: "italic",
  },
  content: {
    marginTop: -theme.spacing(2),
  },
});

export default styles;
