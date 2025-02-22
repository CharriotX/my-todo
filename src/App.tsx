import "./App.css";
import { Header } from "./components/header/Header";
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles'
import { TodoList } from "./components/todoList/TodoList";

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
      <TodoList></TodoList>
    </ThemeProvider>
  );
}

export default App;
