import { createTheme } from "@mui/material";

const darkTheme = createTheme({
    palette:{
        mode:'dark',
        primary:{
            main:'#00ADB5',
        },
        secondary:{
            main:'#EEEEEE',
        },
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#CCCCCC',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
       
    },
})