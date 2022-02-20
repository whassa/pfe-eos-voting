const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "bold",
  },
  shortList: {
    padding: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  andManyMore: {
    userSelect: "none",
  },
});

export default styles;
