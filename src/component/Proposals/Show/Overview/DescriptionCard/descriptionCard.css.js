const styles = (theme) => ({
  root: {
    diplay: "flex",
    flexDirection: "column",
  },
  description: {
    textAlign: "justify",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(15),
    marginTop: "0px",
  },
});

export default styles;
