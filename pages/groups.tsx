import React,{ FC, useContext, useEffect } from 'react'

// Models
import { Player } from "../models";

// Context
import GroupsContext from '../context/groups/GroupsContext'

// Components
import Layout from '../components/layout/Layout'
import GroupList from '../components/groups/GroupList';
 
const Groups: FC = () => {

    const { addPlayer, fetchRankig } = useContext( GroupsContext )

    useEffect(() => {
        
        fetchRankig()

    }, [])

    return ( 
        <Layout
            addAction = { (item: Player) => addPlayer( item ) }
        >
            
            <GroupList />

            {/* 
            
            <div className="md:grid md:grid-cols-2 mt-8 gap-8 w-11/12 mx-auto md:w-full">

                <div>

                    <p> Partidos </p>

                </div>
                
                <div>

                    <p> Grupos </p>

                </div>

            </div> */}

        </Layout>
    );
}
 
export default Groups;