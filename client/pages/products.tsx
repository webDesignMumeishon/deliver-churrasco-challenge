import type { GetServerSideProps, NextPage } from 'next'
import axios from 'axios';

import Header from '../components/Header';
import { IProducts } from '../types/products'
import ListProducts from '../components/ListProducts'
import { useSelector } from 'react-redux';
import { selectAuthState } from '../slices/authSlice';

const Products: NextPage<{ list: IProducts }> = ({ list }: any) => {
  const authState: boolean = useSelector(selectAuthState);
  return (
    <div>
      <Header/>
      <h2 style={{color: '#FFFFFF', textAlign: 'center'}}>Products</h2>
      <ListProducts products={list} />
    </div>
  )
}
export default Products

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await axios.get("http://localhost:4000/product", {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `OursiteJWT=${context.req.cookies.OursiteJWT}` || '',
    }
  })
  
  if(result.status !== 200) {
    return {
      props: {
        list: []
      }
    } 
  }

  return {
    props: {
      list: result.data.products
    }
  }
}
