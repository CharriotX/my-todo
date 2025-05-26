import { ChangeEvent, useState } from 'react'
import { Input } from '../Input/Input'
import styles from "./EditableInput.module.css"

type Props = {
    text: string,
    disabled: boolean,
    updateItem: (newText: string) => void
}

export const EditableInput = ({ text, disabled, updateItem }: Props) => {
    const [inputText, setInputText] = useState<string>(text)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const editOnBlurHandler = () => {
        updateItem(inputText)
        setIsEdit(false)
    }

    const onTextClickHandler = () => {
        setIsEdit(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value)
    }

    return (
        <div className={styles.box}>
            {!isEdit
                ? <div className={styles.textBox} onDoubleClick={onTextClickHandler}>{text}</div>
                : <Input value={inputText} onChange={onChangeHandler} type="text" onBlur={editOnBlurHandler} autoFocus={true} disabled={disabled} />
            }
        </div>
    )
}
