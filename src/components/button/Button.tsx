import React from "react"
import styles from "./Button.module.css"

type Props = {
    children: React.ReactNode
    onClickHandler: () => void
}

export const Button = ({ children, onClickHandler }: Props) => {
    const clickHandler = () => {
        onClickHandler()
    }

    return (
        <button className={styles.myButton} onClick={clickHandler}>
            {children}
        </button>
    )
}
