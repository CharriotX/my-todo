import React from "react"
import styles from "./Modal.module.css"

type Props = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    children: React.ReactNode
}

export const Modal = ({ isOpen, setIsOpen, children }: Props) => {
    return (
        <div className={isOpen ? styles.modal + ` ` + styles.active : styles.modal} onClick={() => setIsOpen(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
