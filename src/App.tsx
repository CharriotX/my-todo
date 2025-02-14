import "./App.css";
import { Header } from "./components/header/Header";
import { TodoAreas } from "./components/todoAreas/TodoAreas";
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: alpha('#7F00FF', 0.5),
      }
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <Header></Header>
      <TodoAreas></TodoAreas>
    </ThemeProvider>
  );
}

export default App;
