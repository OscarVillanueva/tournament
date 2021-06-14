import React,{ FC, useContext, useEffect } from 'react'

// Models
import { Player } from "../models";

// Context
import GroupsContext from '../context/groups/GroupsContext'

// Components
import Layout from '../components/layout/Layout'
import GroupList from '../components/groups/GroupList';
import Swal from 'sweetalert2';
 
const Groups: FC = () => {

    const { addPlayer, fetchRankig, deleteTournament } = useContext( GroupsContext )

    useEffect(() => {
        
        fetchRankig()

    }, [])

    const cancelTournament = async () => {
        
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            icon: 'warning',
            text: "Esta acción no se puede deshacer",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        })

        if( result.isConfirmed ) {

            deleteTournament()
            // changeTournamentStatus( true )

        }

    }

    return ( 
        <Layout
            addAction = { (item: Player) => addPlayer( item ) }
            cancelTournament = { cancelTournament }
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