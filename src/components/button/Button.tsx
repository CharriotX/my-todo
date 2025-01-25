import { ButtonHTMLAttributes } from "react"
import styles from "./Button.module.css"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    classes?: CSSModuleClasses | string
}

export const Button = ({ children, onClick, disabled, classes }: ButtonProps) => {

    return (
        <button disabled={disabled} className={styles.myButton + " " + classes} onClick={onClick}>
            {children}
        </button>
    )
}
