import { useAppSelector } from "@/common/hooks/useAppSelector"
import { Path } from "@/common/routing/Routing"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import { Navigate } from "react-router"

export const Main = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={Path.Login}></Navigate>
    }

    return (
        <Todolists></Todolists>
    )
}
