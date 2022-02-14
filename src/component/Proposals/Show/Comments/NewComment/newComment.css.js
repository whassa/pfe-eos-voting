const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    marginTop: -theme.spacing(2),
  },
  comment: {
    fontSize: theme.typography.pxToRem(15),
    textAlign: "justify",
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    marginTop: 0,
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    fontSize: theme.typography.pxToRem(12),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.colors.lightContrastText,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
});

export default styles;
