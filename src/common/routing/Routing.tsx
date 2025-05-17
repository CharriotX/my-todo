import { Login } from "@/features/auth/ui/Login/Login"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import { Route, Routes } from "react-router"
import { PageNotFound } from "../components/PageNotFound/NotFound"

export const Path = {
    Main: "/",
    Login: "login",
    NotFound: "*"
} as const

export const Routing = () => {
    return (
        <Routes>
            <Route path={Path.Main} element={<Todolists />}></Route>
            <Route path={Path.Login} element={<Login />}></Route>
            <Route path={Path.NotFound} element={<PageNotFound />}></Route>
        </Routes>
    )
}