import { ChangeEvent } from "react"

type Props = {
    children?: React.ReactNode
    type: string
    placeholder?: string
    value: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const Input = ({ children, type, placeholder, value, onChange, onKeyDown }: Props) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
        >
            {children}
        </input>
    )
}
