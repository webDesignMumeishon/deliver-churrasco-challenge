import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router";

import styles from '../styles/Header.module.css'

const Header = () => {
    const router = useRouter()
    const manageLink = router.pathname === '/products' ? {name: 'Add Product', link: 'add'} : {name: 'Products', link: 'products'}

    const handleLogOut = async () => {
        try{
            const result = await axios.delete("http://localhost:4000/login/logout", {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                }
            })
            if(result.status === 200){
                router.push('/products')
            }
        }
        catch(err){
            alert(JSON.stringify(err))
        }

    }

    return (
        <div className={styles.container}>
            <Link 
                href={manageLink.link} 
                className={styles.headerLink}
            >
                {manageLink.name}
            </Link>
            <button className={styles.logoutBtn} onClick={() => handleLogOut()}>Logout</button>
        </div>
    )
}


export default Header