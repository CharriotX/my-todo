import { ButtonHTMLAttributes } from "react"
import styles from "./Button.module.css"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    styleType?: "active" | "disabled" | "default"
    classes?: CSSModuleClasses | string
}

export const Button = ({ children, onClick, disabled, styleType, classes }: ButtonProps) => {

    const style = `
    ${styles.myButton}
    ${styleType === "active" ? styles.active : styleType === "disabled" ? styles.disabled : styleType === "default" ? styles.default : ""}
    ${classes ?? classes}`


    return (
        <button disabled={disabled} className={style} onClick={onClick}>
            {children}
        </button>
    )
}
