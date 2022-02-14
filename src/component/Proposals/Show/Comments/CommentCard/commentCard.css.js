const styles = (theme) => ({
  date: {
    textAlign: "right",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.primary.light,
  },
  menu: {
    visibility: "visible",
  },
  menuHidden: {
    visibility: "hidden",
  },
  comment: {
    overflowWrap: "anywhere",
    textAlign: "justify",
    marginTop: 0,
    marginBottom: 0,
  },
  commentOnEdit: {
    textAlign: "justify",
    marginTop: 0,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: theme.palette.colors.sunset,
    borderRadius: 3,
  },
  replyButton: {
    alignSelf: "flex-end",
    fontSize: theme.typography.pxToRem(12),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.colors.lightContrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  replyTextArea: {
    paddingTop: theme.spacing(2),
  },
});

export default styles;
