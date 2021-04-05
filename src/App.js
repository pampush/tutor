import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/core/styles';

import { Menu } from './components';
import Schedule from './pages/Schedule';
import Box from '@material-ui/core/Box';

function App() {
  return (
    <StylesProvider injectFirst>
      <div className="App">
        <CssBaseline />
        <Menu />
        <Box className="content">
          <Schedule />
        </Box>
      </div>
    </StylesProvider>
  );
}

export default App;
