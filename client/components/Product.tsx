import { IProduct } from '../types/products'
import { ECurrency } from '../types/products'
import styles from '../styles/Product.module.css'
import { useState } from 'react'

type props = {
  product: IProduct
}

const Product: React.FC<props> = ({ product }) => {
  const mainImage = product?.pictures?.length > 0 ? product.pictures[0] : 'https://i.stack.imgur.com/6M513.png'
  
  const [image, setImage] = useState(mainImage)
  const isImageGreaterThanOne = product?.pictures?.length > 1

  const handleMainImage = (e : any) => {
    const selectedImg = product.pictures[e.target.value]
    setImage(selectedImg)
  }
  
  const validCurrencies = Object.values(ECurrency)

  return (
    <div className={styles.cardContainer}>
      <p className={styles.skuNumber}>#{product.SKU || 'NotFound'}</p>

      <div className={styles.imgContainer}>
        <img className={styles.imgStyle} src={image} alt="Image" />

        <div className={styles.btnWrapper}>
          {
            isImageGreaterThanOne && product.pictures.map((p, i) => {

              if(p === image){
                return (
                  <button 
                    value={i} 
                    className={styles.selectedImg}
                    onClick={handleMainImage}
                  >
                  </button>
                )
              }

              return (
                <button 
                  value={i} 
                  className={styles.nonSelectedImg}
                  onClick={handleMainImage}
                >
                  
                </button>
              )
            })
          }
        </div>

  
      </div>

      <div className={styles.infoContainer}>
        <p className={styles.productName}>{product.name}</p>
        <p>Code: <span className={styles.codeLabel}>{product.code || 'NotFound'}</span></p>
        <p>Price: ${product.price} {validCurrencies.includes(product.currency as ECurrency) ? product.currency : ECurrency.PEN} </p>
      </div>
    </div>
  )
}

export default Product

