import { ChangeEvent } from "react"

type Props = {
    children?: React.ReactNode
    type: "text" | "number" | "checkbox"
    placeholder?: string
    value: string
    name?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    disabled?: boolean
}

export const Input = ({ children, type, placeholder, value, name, onChange, onKeyDown, disabled }: Props) => {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            disabled={disabled}
        >
            {children}
        </input>
    )
}
