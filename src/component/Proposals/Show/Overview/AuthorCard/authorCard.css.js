const styles = (theme) => ({
  root: {
    padding: 14,
    marginBottom: 16,
  },
  avatar: {
    width: "5rem",
    height: "5rem",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "10px",
  },
  author: {
    textAlign: "center",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 500,
    marginBottom: "-10px",
  },
  title: {
    textAlign: "left",
    marginBottom: 16,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "rgba(50, 72, 86, 0.1)",
  },
  content: {
    marginBottom: 16,
  },
});

export default styles;
