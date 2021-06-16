import React,{ FC, useContext, useEffect } from 'react'

// Models
import { Player } from "../models";

// Context
import GroupsContext from '../context/groups/GroupsContext'
import GlobalContext from '../context/global/GlobalContext'

// Components
import Layout from '../components/layout/Layout'
import GroupList from '../components/groups/GroupList';
import Swal from 'sweetalert2';
import GroupMatchList from '../components/groups/GroupMatchList';
 
const Groups: FC = () => {

    const { matches, addPlayer, fetchRankig, fetchMatches, deleteTournament } = useContext( GroupsContext )
    const { changeTournamentStatus } = useContext( GlobalContext )

    useEffect(() => {
        
        fetchRankig()
        fetchMatches()

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
            changeTournamentStatus( true )

        }

    }

    return ( 
        <Layout
            addAction = { (item: Player) => addPlayer( item ) }
            cancelTournament = { cancelTournament }
        >
            

            { matches.length === 0 ? (

                <GroupList />

            ) : (

                <div className="md:grid md:grid-cols-2 pt-8 gap-8 w-11/12 mx-auto md:w-full">

                    <div>

                        <GroupMatchList />

                    </div>
                    
                    <div>

                        <GroupList />

                    </div>

                </div> 

            )}

        </Layout>
    );
}
 
export default Groups;