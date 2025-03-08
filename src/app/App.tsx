import "./App.css";
import { Header } from "../common/components/header/Header";
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles'
import "@/common/theme/Global.css"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists";

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
      <Todolists></Todolists>
    </ThemeProvider>
  );
}

export default App;
