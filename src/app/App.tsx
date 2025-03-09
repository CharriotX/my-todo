import "./App.css";
import { Header } from "../common/components/header/Header";
import "@/common/theme/Global.css"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists";
import { Container } from "@/common/components/container/Container";

function App() {

  return (
    <>
      <Header></Header>
      <Container>
        <Todolists></Todolists>
      </Container>
    </>
  );
}

export default App;
