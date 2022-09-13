import { IProduct } from '../types/products'
import Product from './Product'
import styles from '../styles/ListProducts.module.css'

type props = {
  products: IProduct[]
}

const ListProducts: React.FC<props> = ({ products }) => {
  return (
    <div className={styles.container} >
      {products.map((p: IProduct) => {
        return <Product key={p.SKU} product={p} />
      })}
    </div>
  )
}

export default ListProducts
