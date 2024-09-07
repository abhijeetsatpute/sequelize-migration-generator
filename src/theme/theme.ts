import { createTheme } from "@mui/material/styles";

const typography = {
  h2: {
    // fontWeight: 600,
    // color: "red",
    fontFamily: "LilitaOne",
  },
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography,
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography,
});

export { lightTheme, darkTheme };
