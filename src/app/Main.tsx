import { useAppSelector } from "@/common/hooks/useAppSelector"
import { Path } from "@/common/routing/Routing"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import { Navigate } from "react-router"
import { selectIsLoggedIn } from "./app-slice"

export const Main = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={Path.Login}></Navigate>
    }

    return (
        <Todolists></Todolists>
    )
}
