import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  homeMarginTop: '20px',
  palette: {
    primary: {
      main: "#324856",
      light: "#5d7383",
      dark: "#08212d",
    },
    secondary: {
      main: "#d66c44",
      light: "#ff9c70",
      dark: "#9f3e1a",
    },
    grey: {
      400: "#BDBDBD",
    },
    background: {
      default: "#F7F9FC",
    },
    colors: {
      nightfall: "#324856", // dark blue
      rawSienna: "#d18237", // orange
      coolSage: "#4a746a", // darkgreen
      sunset: "#d66c44",
      white: "#FFFFFF",
      black: "#000000",
      lightContrastText: "#fff",
      darkContrastText: "#000",
      grey: "#BDBDBD",
      success: "#4BB543",
      error: "#E8000B"
    },
  },
});

export default theme;
