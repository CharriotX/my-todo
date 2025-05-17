import React from "react"
import styles from "./Input.module.css"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ children, error, ...rest }, ref) => {
    return (
        <>
            <input
                className={`${styles.input} ${error && styles.error}`}
                ref={ref}
                {...rest}
            >
                {children}
            </input>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    )
});
