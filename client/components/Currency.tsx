import styles from '../styles/Currency.module.css'
import { ECurrency } from '../types/products'

type props = {
    handleCurrencyOnChange: (e: any) => void
}

const Currency: React.FC<props> = ({ handleCurrencyOnChange }) => {
    return (
        <div className={styles.checkboxContainer}>
            <label htmlFor="usd">
                <input
                    type="radio"
                    id="usd"
                    name="currency"
                    value={ECurrency.USD}
                    onClick={handleCurrencyOnChange}
                    defaultChecked
                />USD
            </label>
            <label htmlFor="eur">
                <input
                    type="radio"
                    id="eur"
                    name="currency"
                    value={ECurrency.EUR}
                    onClick={handleCurrencyOnChange}
                />EUR
            </label>
            <label htmlFor="pen">
                <input
                    type="radio"
                    id="pen"
                    name="currency"
                    value={ECurrency.PEN}
                    onClick={handleCurrencyOnChange}
                />PEN
            </label>
        </div>
    )
}

export default Currency