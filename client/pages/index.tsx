import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux'
import { FaUser } from 'react-icons/fa';

import styles from '../styles/Home.module.css'
import { IUser } from "../types/user"
import { wrapper } from '../store'
import { setAuthState, selectAuthState } from '../slices/authSlice'
import axios from 'axios'

export const getServerSideProps = wrapper.getServerSideProps(
  (store: { dispatch: (arg0: { payload: any; type: string }) => any; getState: () => any }) =>
    async ({ params }) => {
      // we can set the initial state from here
      // we are setting to false but you can run your custom logic here
      await store.dispatch(setAuthState(true));
      console.log("State on server", store.getState());
      return {
        props: {
          authState: false,
        },
      };
    }
);


const Home: NextPage = () => {
  const router = useRouter()
  const authState: boolean = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const [logUser, setLogUser] = useState<IUser>({
    login: '',
    password: ''
  })

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setLogUser(
      {
        ...logUser,
        [name]: value
      }
    )
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const data = await axios.post("http://localhost:4000/login", logUser, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (data.status === 202) {
        router.push('/products')
        dispatch(setAuthState(true))
      }
    }
    catch(err : any){
      setLogUser({
        login: '',
        password: ''
      })
      alert(JSON.stringify(err.response.data))
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>churrasco-challenge</title>
        <meta name="churrasco-challenge" content="Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image className={styles.churrascoLogo} src="/churrasco-logo.png" alt="" width={150} height={100} />

        <form onSubmit={handleLogin} className={styles.login}>

          <div className={styles.inputContainer}>
            <span className={styles.inputIcon}><FaUser /></span>
            <input
              className={styles.loginInput}
              type="text" placeholder='Username'
              name='login'
              value={logUser.login}
              onChange={handleOnChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <span className={styles.inputIcon}><RiLockPasswordFill /></span>
            <input
              className={styles.loginInput}
              type="password"
              placeholder='Password'
              name='password'
              value={logUser.password}
              onChange={handleOnChange}
            />
          </div>

          <div className={styles.btnCheckboxWrapper}>
            <label htmlFor="remember">
              <input type="checkbox" name='remember' placeholder='remember' />remember
            </label>
            <button className={styles.loginBtn} type='submit' >
              Log in
            </button>
          </div>

        </form>
      </main>

      <footer className={styles.footer}>
        <p onClick={
          () => {
            authState ? dispatch(setAuthState(false)) : dispatch(setAuthState(true))
          }
        }>
          web services under your control
        </p>
      </footer>
    </div >
  )
}

export default Home
