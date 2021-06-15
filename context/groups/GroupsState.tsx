import React, { FC, useReducer } from 'react'
import shortid from 'shortid'

// Context y Reducer
import GroupsContext from './GroupsContext'
import GroupsReducer from './GroupsReducer'

// Modelos
import { Player, Group } from "../../models";
import { DragElement } from '../../hooks/useDragAndDrop'

// Hooks
import useLocalStorage from '../../hooks/useLocalStorage'

// Tipos
import { 
    CLEAR_STATE,
    FETCH_PLAYERS,
    SET_GROUPS 
} from '../../types';

const GroupsState: FC = ({ children }) => {

    const initialState = {
        groups: []
    }

    const [ state, dispatch ] = useReducer( GroupsReducer, initialState )

    const { getFromStorage, setIntoStorage, clearStorage } = useLocalStorage( "groups" )

    const fetchRankig = () => {
        
        try {
            
            const data = getFromStorage( "ranking" )

            dispatch({
                type: SET_GROUPS,
                payload: data ? data : []
            })  

        } catch (error) {

            console.log(error)
            
        }

    }

    const addPlayer = ( player: Player ) => {
        
        const bridge = [ ...state.groups ]

        // Primero buscamos si un grupo esta incompleto
        const group = bridge.findIndex( ( g: Group ) => g.players.length < 4 )

        const newPlayer = {
            ...player,
            id: shortid.generate() 
        }

        if( group >= 0) bridge[ group ].players.push( newPlayer )

        else {

            // Si esta incompleto agregamos si no creamos otro grupo
            const newGroup: Group = {
                id: shortid.generate(),
                name: `Grupo ${ bridge.length + 1 }`,
                players: [ newPlayer ]
            }

            bridge.push( newGroup )

        }

        // Agregamos al state y al storage
        setIntoStorage( "ranking", bridge )

        dispatch({
            type: SET_GROUPS,
            payload: bridge
        })

    }

    const deleteTournament = () => {
        
        clearStorage([ "ranking", "matches" ])

        dispatch({
            type: CLEAR_STATE,
            payload: null
        })

    }

    const exchangePlayers = ( source: DragElement, dest: DragElement ) => {
     
        // Identificamos los grupos
        const sourceGroup = state.groups.findIndex( ( group: Group ) => group.name === source.stage )
        const destGroup = state.groups.findIndex( ( group: Group ) => group.name === dest.stage )

        // Sacamos los grupos
        let playerOfSource = state.groups[ sourceGroup ].players
        let playerOfDest = state.groups[ destGroup ].players

        // Identificar los jugadores
        const sourcePlayer = playerOfSource.find( ( player: Player ) => player.id === source.id )
        const destPlayer = playerOfDest.find( ( player: Player ) => player.id === dest.id )
        
        // Intercambiamos
        playerOfSource = playerOfSource.map( 
            (player: Player) => player.id !== sourcePlayer.id ? player : destPlayer
        )

        playerOfDest = playerOfDest.map(
            (player: Player) => player.id !== destPlayer.id ? player : sourcePlayer
        )
        
        // Actualizamos el state
        const bridge = [ ...state.groups ]
        bridge[ sourceGroup ].players = playerOfSource
        bridge[ destGroup ].players = playerOfDest

        // Agregamos al state y al storage
        setIntoStorage( "ranking", bridge )

        dispatch({
            type: SET_GROUPS,
            payload: bridge
        })

    }

    return ( 

        <GroupsContext.Provider
            value = {{
                groups: state.groups,
                addPlayer,
                fetchRankig,
                deleteTournament,
                exchangePlayers
            }}
        >

            { children }

        </GroupsContext.Provider>

    );
}
 
export default GroupsState;