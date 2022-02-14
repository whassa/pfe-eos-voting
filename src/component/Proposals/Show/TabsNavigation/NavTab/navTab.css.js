const styles = (theme) => ({
  root: {
    color: "rgba(0,0,0,0.5)",
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontStretch: "normal",
    fontStyle: "normal",
    justifyContent: "center",
    fontSize: theme.typography.pxToRem(24),
    "&:hover": {
      color: "#d66c44",
      opacity: 1,
    },
    "&:focus": {
      opacity: 1,
      color: "#d66c44",
    },
    "&:selected": {
      color: "#d66c44",
    },
    "& > span": {
      whiteSpace: "nowrap",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
});

export default styles;
