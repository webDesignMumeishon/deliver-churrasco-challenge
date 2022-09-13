import { ChangeEvent } from 'react'
import styles from '../styles/FieldInput.module.css'
import OptionalTag from './OptionalTag'

type inputType = 'text' | 'number'

type props = {
    name: string
    opcional?: boolean
    value: string | number
    type?: inputType
    handleInput : (e : ChangeEvent<HTMLInputElement>) => void
}

const FieldInput : React.FC<props> = ({name, opcional = false, value, handleInput, type = 'text'}) => {
   return ( 
        <div className={styles.inputContainer}>
            <p>{name} {opcional ? <OptionalTag/> : null}</p>
            <input type={type} value={value} onChange={handleInput} name={name.toLowerCase()}/>
        </div>
    )
} 

export default FieldInput