import React from "react"
import styles from "./Button.module.css"

type Props = {
    children: React.ReactNode
    onClickHandler: () => void
    classes?: string | CSSModuleClasses
    disabled?: false
}

export const Button = ({ children, onClickHandler, classes, disabled }: Props) => {
    const clickHandler = () => {
        onClickHandler()
    }

    return (
        <button disabled={disabled} className={styles.myButton + " " + classes} onClick={clickHandler}>
            {children}
        </button>
    )
}
