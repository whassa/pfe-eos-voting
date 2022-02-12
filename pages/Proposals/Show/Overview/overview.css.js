const styles = (theme) => ({
  info: {
    [theme.breakpoints.up("sm")]: {
      minWidth: 230,
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
});

export default styles;
