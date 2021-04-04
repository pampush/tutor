import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from "@material-ui/core/styles";
import Header from './components/Menu';

function App() {
  return (
    <StylesProvider injectFirst>
      <div className="App">
        <CssBaseline />
        <Header />
      </div>
    </StylesProvider>
  );
}

export default App;
