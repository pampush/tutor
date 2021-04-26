import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
/**
 * Global material ui styles overrides
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: orange[500],
    },
    text: {
      primary: '#000000',
      secondary: '#9E9E9E',
    },
  },
  typography: {
    body1: { fontSize: '1.3rem' },
  },

  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#F5F5F5',
      },
    },
    MuiButton: {
      label: { color: '#ffffff' },
      containedSecondary: {
        '&:hover': {
          backgroundColor: 'rgba(255, 192, 70, 0.5)',
        },
      },
    },
    MuiIconButton: {
      colorSecondary: {
        '&:hover': {
          backgroundColor: 'rgba(255, 192, 70, 0.5)',
          '@media (hover:none)': {
            backgroundColor: 'transparent',
          },
        },
      },
      root: {},
    },
    MuiCardContent: {
      root: {
        '&:last-child': { paddingBottom: '16px' },
      },
    },
  },
});

export default theme;
