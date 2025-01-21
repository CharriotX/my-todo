import React from "react"
import styles from "./Button.module.css"

type Props = {
    children: React.ReactNode
    onClickHandler: () => void
    classes?: string | CSSModuleClasses
}

export const Button = ({ children, onClickHandler,classes }: Props) => {
    const clickHandler = () => {
        onClickHandler()
    }

    return (
        <button className={styles.myButton + " " + classes} onClick={clickHandler}>
            {children}
        </button>
    )
}
