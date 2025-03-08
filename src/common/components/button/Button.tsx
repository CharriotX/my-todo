import { ButtonHTMLAttributes } from "react"
import styles from "./Button.module.css"

type ButtonType = "default" | "secondary" | "red" | "active"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    buttonType?: ButtonType,
}

export const Button = ({ children, onClick, disabled, buttonType, ...rest }: ButtonProps) => {

    const finalClassName = styles.button + " "
        + (disabled === true
            ? styles.disabled : buttonType === "red"
                ? styles.red : buttonType === "secondary"
                    ? styles.secondary : buttonType === "active"
                        ? styles.active : styles.default)

    return (
        <button disabled={disabled} className={finalClassName} onClick={onClick} {...rest}>
            {children}
        </button>
    )
}
