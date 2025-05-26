import "./App.css";
import { Header } from "../common/components/Header/Header";
import "@/common/theme/Global.css"
import { Container } from "@/common/components/Container/Container";
import { ErrorSnackbar } from "@/common/components/ErrorSnackbar/ErrorSnackbar";
import { Routing } from "@/common/routing";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import styles from "./App.module.css"
import { useMeQuery } from "@/features/auth/api/authApi";
import { ResultCode } from "@/common/enums";
import { setIsLoggedIn } from "./app-slice";

function App() {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (isLoading) return
    setIsInitialized(true)
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    }

  }, [isLoading])

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
