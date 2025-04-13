import "./App.css";
import { Header } from "../common/components/header/Header";
import "@/common/theme/Global.css"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists";
import { Container } from "@/common/components/container/Container";
import { ErrorSnackbar } from "@/common/components/errorSnackbar/ErrorSnackbar";

function App() {

  return (
    <>
      <Header></Header>
      <Container>
        <Todolists></Todolists>
        <ErrorSnackbar></ErrorSnackbar>
      </Container>
    </>
  );
}

export default App;
