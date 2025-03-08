import { ChangeEvent, useState } from 'react'
import { Input } from '../input/Input'
import styles from "./EditableInput.module.css"

type Props = {
    text: string
    updateItem: (newText: string) => void
}

export const EditableInput = ({ text, updateItem }: Props) => {
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
                ? <div className={styles.textBox} onClick={onTextClickHandler}>{text}</div>
                : <Input value={inputText} onChange={onChangeHandler} type="text" onBlur={editOnBlurHandler} autoFocus={true} />
            }
        </div>
    )
}
