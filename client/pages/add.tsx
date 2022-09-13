import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

import Currency from '../components/Currency'
import FieldInput from '../components/FieldInput'
import OptionalTag from '../components/OptionalTag'
import styles from '../styles/AddProduct.module.css'
import Header from '../components/Header';
import {IProductInput} from '../types/products'



const AddProduct: NextPage = () => {

    // states
    const [currency, setCurrency] = useState<string>('USD')
    const [textAreaValue, setTextAreaValue] = useState<string>('')
    const [filesList, setFilesList] = useState<any>(null)

    const [productInputs, setProductsInputs] = useState<IProductInput>({
        sku: '',
        code: 0,
        name: '',
        price: 0
    })

    // handlers
    const handleCurrencyOnChange = (e: ChangeEvent<HTMLInputElement> ) => {
        setCurrency(e.target.value)
    }

    const handleTextAreaOnChange = (e: ChangeEvent<HTMLTextAreaElement> ) => {
        setTextAreaValue(e.target.value)
    }

    const handleInputFieldOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setProductsInputs((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleOnChangeFile = (e : any) => {
        const files = e.target.files
        setFilesList([...files])
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if(filesList === null){
            alert('Please upload some pictures')   
            return
        }

        const formData = new FormData()
        filesList.forEach((file : any) => {
            formData.append('image', file, file.name)
        });
        formData.append('SKU', productInputs.sku)
        formData.append('code', productInputs.code.toString())
        formData.append('name', productInputs.name)
        formData.append('description', textAreaValue)
        formData.append('price', productInputs.price.toString())
        formData.append('currency', currency)

        try{
            const response = await axios.post("http://localhost:4000/product", formData,{
                withCredentials: true,
            })
    
            if(response.status === 201){
                setCurrency('USD')
                setTextAreaValue('')
                setFilesList([])
                setProductsInputs({
                    sku: '',
                    code: 0,
                    name: '',
                    price: 0
                })
                alert('Product was created')
            }
        }
        catch(err : any){
            alert(JSON.stringify(err.response.data))
        }
    }

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <h2>Add Product</h2>
                    <form className={styles.mainForm} onSubmit={handleOnSubmit}>
                        <FieldInput
                            name={'SKU'}
                            value={productInputs.sku}
                            handleInput={handleInputFieldOnChange}
                        />
                        <FieldInput
                            name={'Code'}
                            opcional={true}
                            type={'number'}
                            value={productInputs.code}
                            handleInput={handleInputFieldOnChange}
                        />
                        <FieldInput
                            name={'Name'}
                            value={productInputs.name}
                            handleInput={handleInputFieldOnChange}
                        />
                        <FieldInput
                            name={'Price'}
                            value={productInputs.price}
                            type={'number'}
                            handleInput={handleInputFieldOnChange}
                        />

                        <div className={styles.textareaWrapper}>
                            <p>
                                Description <OptionalTag />
                            </p>
                            <textarea
                                className={styles.textareaInput}
                                name="description" rows={5}
                                placeholder="Description"
                                value={textAreaValue}
                                onChange={handleTextAreaOnChange}
                            >
                            </textarea>
                        </div>
                        <Currency handleCurrencyOnChange={handleCurrencyOnChange} />
                        <input className={styles.chooseFileBtn} type="file" name="image" id="image" multiple onChange={handleOnChangeFile}/>
                        <button type='submit' name='image' className={styles.submitBtn}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}




export default AddProduct

