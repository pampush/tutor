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
      secondary: '#757575',
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
          backgroundColor: '#2196F3',
        },
      },
    },
    MuiIconButton: {
      colorSecondary: {
        '&:hover': {
          backgroundColor: '#2196F3',
          color: '#FFFFFF',
          '@media (hover:none)': {
            backgroundColor: orange[500],
          },
        },
      },
    },
    MuiCardContent: {
      root: {
        '&:last-child': { paddingBottom: '16px' },
      },
    },
  },
});

export default theme;
