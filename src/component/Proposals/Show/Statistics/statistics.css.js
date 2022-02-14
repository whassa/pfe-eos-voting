import { makeStyles } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  cards: {
    height: "100%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  bigNumber: {
    display: "block",
    width: "100%",
    textAlign: "center",
    fontSize: 70,
    fontWeight: "bold",
    color: " #4a746a",
  },
  subNumber: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 20,
  },
  voteElement: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
  },
  number: {
    fontWeight: "bold",
  },
  numberSentence: {
    fontSize: 25,
  },
  title: {
    marginTop: 0,
    marginBottom: 5,
    fontFamily: theme.fontFamily,
    textAlign: "left",
    color: theme.palette.text.primary,
  },
  gridline: {
    opacity: 0.25,
    stroke: "gray",
    strokeWidth: 1,
  },
  line: {
    strokeWidth: "3px",
    fillOpacity: 0,
  },
  axis: {
    fontSize: "14px",
  },
}));

export default useStyles;
