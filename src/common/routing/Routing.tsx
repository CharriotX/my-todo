import { Login } from "@/features/auth/ui/Login/Login"
import { Route, Routes } from "react-router"
import { PageNotFound } from "../components/PageNotFound/NotFound"
import { Main } from "@/app/Main"
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute"
import { useAppSelector } from "../hooks/useAppSelector"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice"

export const Path = {
    Main: "/",
    Login: "login",
    NotFound: "*"
} as const

export const Routing = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    return (
        <Routes>
            <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
                <Route path={Path.Main} element={<Main />} />
            </Route>
            <Route
                path={Path.Login}
                element={
                    <ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main}>
                        <Login />
                    </ProtectedRoute>
                }
            />
            <Route path={Path.NotFound} element={<PageNotFound />} />
        </Routes>
    )
}