import { RootState } from "../../../app/store";
import { TodolistType } from "../ui/Todolists/Todolists";

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists