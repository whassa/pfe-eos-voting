const styles = (theme) => ({
  table: {
    marginTop: "-5px",
    paddingBottom: "-10px",
  },
  detailsName: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(15),
    padding: "4px",
    borderBottom: "none",
    fontWeight: 500,
  },
  detailsValue: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(15),
    padding: "6px",
    borderBottom: "none",
  },
});

export default styles;
