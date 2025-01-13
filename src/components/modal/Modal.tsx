import React from "react"
import styles from "./Modal.module.css"

type Props = {
    active: boolean
    setActive: (value: boolean) => void
    children: React.ReactNode
}

export const Modal = ({ active, setActive, children }: Props) => {
    return (
        <div className={active ? styles.modal + ` ` + styles.active : styles.modal} onClick={() => setActive(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
