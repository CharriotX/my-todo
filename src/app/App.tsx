import "./App.css";
import { Header } from "../common/components/Header/Header";
import "@/common/theme/Global.css"
import { Container } from "@/common/components/Container/Container";
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar";
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
