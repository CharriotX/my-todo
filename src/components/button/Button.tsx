import React from "react"
import styles from "./Button.module.css"

type Props = {
    children: React.ReactNode
    onClickHandler?: () => void
}

export const Button = ({ children, onClickHandler }: Props) => {
    return (
        <button className={styles.myButton} onClick={onClickHandler}>
            {children}
        </button>
    )
}
