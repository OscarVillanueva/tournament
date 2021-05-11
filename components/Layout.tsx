import React,{ FC } from 'react'
import Head from 'next/head'
 
const Layout: FC = ({ children }) => {
    return ( 
        
        <>

            <Head>

                <title>RoRol</title>

            </Head>


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