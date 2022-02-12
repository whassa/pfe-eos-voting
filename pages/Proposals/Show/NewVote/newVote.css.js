const styles = (theme) => ({
  modalContainer: {
    position: "fixed",
    zIndex: "1300",
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backdropFilter: "blur(16px)",
    backgroundColor: "rgba(0, 0, 0, 0.68)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: `fadeIn 3000ms ${theme.transitions.easing.easeInOut}`,
  },
  modalBody: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    color: "rgba(255,255,255,0.87)",
    minHeight: "75%",
  },
  voteContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 55,
  },
  voteMessageContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    textAlign: "center",
  },
  voteTable: {
    width: "100%",
    minWidth: 350,
    border: "solid 1px rgba(255, 255, 255, 0.5)",
    borderRadius: 8,
  },
  voteMessageIcon: {
    width: 150,
    height: 150,
  },
  voteRow: {
    borderBottom: "solid 1px rgba(255, 255, 255, 0.5)",
    width: "100%",
    padding: 16,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    "-webkit-tap-highlight-color": "rgba(214,108,68,0.5)",
    "&:hover": {
      backgroundColor: "rgba(214,108,68,0.5)",
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },
  confirmColor: {
    color: "#56b111",
  },
  secondaryText: {
    letterSpacing: 6.24,
    textAlign: "left",
    color: "rgba(255,255,255,0.39)",
  },
  underlined: {
    textDecoration: "underline",
    marginTop: 16,
    cursor: "pointer",
  },
  closeIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    color: "rgba(255,255,255,0.87)",
    cursor: "pointer",
  },
});

export default styles;
