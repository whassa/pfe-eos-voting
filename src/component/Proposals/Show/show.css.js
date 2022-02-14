const styles = (theme) => ({
  // // TAB BLOCK
  tabs: {
    paddingLeft: 0,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },

  // INFORMATION BLOCK
  details: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  controls: {
    display: "flex",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  infoCard: {
    display: "flex",
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingLeft: 0,
    top: 0,
    left: 80,
    alignItems: "center",
  },
  media: {
    height: 114,
    width: 114,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  button: {
    marginRight: 16,
  },
  close: {
    cursor: "not-allowed",
  },
  voteButton: {
    height: "fit-content",
    padding: "15px 30px",
  },
  buttonContainer: {
    marginLeft: "auto",
    marginRight: 36,
  },
});

export default styles;
