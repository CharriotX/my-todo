import { ButtonHTMLAttributes } from "react"
import styles from "./Button.module.css"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    classes?: CSSModuleClasses | string
    disabled?: boolean
}

export const Button = ({ children, onClick, disabled }: ButtonProps) => {

    return (
        <button disabled={disabled} className={styles.myButton} onClick={onClick}>
            {children}
        </button>
    )
}
