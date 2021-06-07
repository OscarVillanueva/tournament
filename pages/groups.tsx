import React,{ FC, useContext } from 'react'

// Models
import { Player } from "../models";

// Context
import GroupsContext from '../context/groups/GroupsContext'

// Components
import Layout from '../components/layout/Layout'
 
const Groups: FC = () => {

    const { addPlayer } = useContext( GroupsContext )

    return ( 
        <Layout
            addAction = { (item: Player) => addPlayer( item ) }
        >
            
            <h1
                className = "text-center text-xl text-white pt-10 font-bold"
            >
                Grupos
            </h1> 
            
            <div className="md:grid md:grid-cols-2 mt-8 gap-8 w-11/12 mx-auto md:w-full">

                <div>

                    <p> Partidos </p>

                </div>
                
                <div>

                    <p> Grupos </p>

                </div>

            </div>

        </Layout>
    );
}
 
export default Groups;