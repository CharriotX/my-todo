import { ChangeEvent, MutableRefObject } from "react"

type Props = {
    children?: React.ReactNode
    type: string
    placeholder?: string
    value: string
    name?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    ref?: MutableRefObject<undefined>
}

export const Input = ({ children, type, placeholder, value, name, onChange, onKeyDown }: Props) => {
    return (
        <input
            name={name}
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
