import React,{ FC } from 'react'
import Head from 'next/head'
import { useRouter } from "next/router";

// Componentes
import Navigation from './Navigation'
 
const Layout: FC = ({ children }) => {

    const router = useRouter()

    return ( 
        
        <>

            <Head>

                <title>RoRol</title>

            </Head>

            { router.pathname !== "/" && (

                <Navigation />

            )}

            <div className="bg-green-800 min-h-screen">
                <div className="container mx-auto">
                    <main className="pt-8 md:pt-0">
            
                        { children }

                    </main>
                </div>
            </div>

        </>
        
    );
}
 
export default Layout;