import { ReactElement } from "react"


type props = {
    children: ReactElement<any, any>
}

const Layout: React.FC<props> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export default Layout