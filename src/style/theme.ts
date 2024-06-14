
import { createTheme } from '@mui/material/styles';

const grey = createTheme({
    palette: {
      primary: {
        main: '#F0F0F0',
      },
      secondary: {
        main: '#edf2ff',
      }
    },
});

const padrao = createTheme({
    palette: {
      primary: {
        main: '#4285F4',
      },
      secondary: {
        main: '#3f51b5',
      }
    },
});

const laranja = createTheme({
    palette: {
      primary: {
        main: '#BC5F13',
      },
      secondary: {
        main: '#e39d64',
      }
    },
    components: {
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: '#e39d64', // Substitua por qualquer cor desejada
            },
          },
        },
    },
});

export {grey, padrao, laranja};