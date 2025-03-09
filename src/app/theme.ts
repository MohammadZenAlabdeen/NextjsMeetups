"use client"
import { createTheme } from "@mui/material";
import { blue, red } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff', 
        },
        secondary: {
            main: red[500], 
        },
        text: {
            primary: '#000000',
            secondary:'gray',
            disabled: '#ffffff'
        },
        action: {
            active: blue[500],
            hover: blue[400]
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif', 
    },
   
});

export default theme;
