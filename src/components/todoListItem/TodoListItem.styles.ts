import { SxProps } from "@mui/material";
import { TodoStatusType } from "../todoList/TodoList";
import { green, lime, pink } from "@mui/material/colors";

export const buttonSx: SxProps = {
    fontSize: "12px",
    minWidth: "80px",
}

export const collapseButtonSx: SxProps = {
    position: "absolute",
    top: 5,
    right: 5
}

export const getBackgroundBoxSx = (status: TodoStatusType): SxProps => ({
    backgroundColor: status === "Todo" ? pink[50] : status === "In Progress" ? lime[50] : green[50],
    position: "relative",
    padding: "10px"
})