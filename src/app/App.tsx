import "./App.css";
import { Header } from "../common/components/header/Header";
import "@/common/theme/Global.css"
import { Container } from "@/common/components/container/Container";
import { ErrorSnackbar } from "@/common/components/errorSnackbar/ErrorSnackbar";
import { Routing } from "@/common/routing";

function App() {

  return (
    <>
      <Header></Header>
      <Container>
        <Routing></Routing>
        <ErrorSnackbar></ErrorSnackbar>
      </Container>
    </>
  );
}

export default App;
