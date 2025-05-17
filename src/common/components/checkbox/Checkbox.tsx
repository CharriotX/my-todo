import React from "react"
import styles from "./Checkbox.module.css"

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ error, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={styles.checkbox}
            type="checkbox" {...props}>
        </input>
    )
})