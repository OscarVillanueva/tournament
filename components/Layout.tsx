import React,{ FC } from 'react'
import Head from 'next/head'
import { useRouter } from "next/router";

// Componentes
import Navigation from './Navigation'

export interface LayoutProps {
    addAction?: Function
    cancelTournament?: Function
}
 
const Layout: FC<LayoutProps> = ({ addAction, cancelTournament, children }) => {

    const router = useRouter()

    return ( 
        
        <>

            <Head>

                <title>RoRol</title>

            </Head>

            { router.pathname !== "/" && (

                <div className="bg-green-800">
                    <div className="container mx-auto">
                        <Navigation 
                            addAction = { addAction }
                            cancelTournament = { cancelTournament }
                        />
                    </div>
                </div>

            )}

            <div className="bg-green-800 min-h-screen">
                <div className="container mx-auto">
                    <main className="pt-8 md:pt-0 pb-10">
            
                        { children }

                    </main>
                </div>
            </div>

        </>
        
    );
}
 
export default Layout;