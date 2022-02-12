import { makeStyles } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  actionArea: {
    display: "flex",
    justifyContent: "left",
  },
  draft: {
    opacity: 0.5,
  },
  draftRed: {
    color: "red",
  },
  media: {
    height: 200,
    width: 200,
    flexBasis: 200,
    flexGrow: 0,
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      flexBasis: 150,
    },
  },
  voteNumber: {
    marginLeft: "auto",
    marginRight: 40,
    borderRadius: "50%",
    border: "solid 5px #2fc600",
    padding: 16,
    fontSize: 20,
    fontWeight: "bold",
    width: 72,
    height: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0,
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      marginRight: 10,
      width: 60,
      height: 60,
    },
  },
  cardDescription: {
    marginTop: 30,
  },
}));

export default useStyles;
