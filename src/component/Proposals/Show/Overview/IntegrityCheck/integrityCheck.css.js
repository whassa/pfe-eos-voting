const styles = (theme) => ({
  id: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(15),
    overflowWrap: "break-word",
    textAlign: "left",
  },
  valid: {
    fontSize: "7rem",
    color: theme.palette.success.light,
  },
  invalid: {
    fontSize: "7rem",
    color: theme.palette.error.light,
  },
});

export default styles;
