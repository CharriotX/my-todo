import "./App.css";
import { Header } from "../common/components/Header/Header";
import "@/common/theme/Global.css"
import { Container } from "@/common/components/Container/Container";
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar";
import { Routing } from "@/common/routing";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { initializeApp } from "@/features/auth/model/auth-slice";
import { CircularProgress } from "@mui/material";
import styles from "./App.module.css"

function App() {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeApp()).finally(() => {
      setIsInitialized(true)
    })

  }, [])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }


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
