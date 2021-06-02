import React, { FC, useReducer } from 'react'
import shortid from 'shortid'
import EliminationContext from './EliminationContext'
import EliminationReducer from './EliminationReducer'

// Hooks
import useLocalStorage from '../../hooks/useLocalStorage'

// Models
import { Player, TournamentFinal, TournamentType } from '../../models'

// Types
import { 

    ADD_PLAYER, 
    CLEAR_STATE, 
    DELETE_PLAYER, 
    FETCH_PLAYERS, 
    SET_MATCHES

} from "../../types";

const EliminationState: FC = ({ children }) => {

    const initialState = {
        ranking: [],
        matches: [],
        config: {
            id: 0,
            tournament_id: 0,
            name: "RoRol - Un solo partido",
            type: TournamentType.single,
            number: 1,
            settings: {
                size: 16,
                seedOrdering: [
                    "natural",
                    "natural",
                    "reverse_half_shift",
                    "reverse"
                ],
                grandFinal: TournamentFinal.single,
                matchesChildCount: 0,
            }
        }
    }

    const { getFromStorage, setIntoStorage, clearStorage } = useLocalStorage( "elimination" )

    const [ state, dispatch ] = useReducer( EliminationReducer, initialState )

    const fetchRankig = () => {
        
        try {
            
            const data = getFromStorage( "ranking" )
            
            dispatch({
                type: FETCH_PLAYERS,
                payload: data ? data : []
            })  

        } catch (error) {

            console.log(error)
            
        }

    }

    const fetchMatches = () => {
        
        try {
            
            const data = getFromStorage( "matches" )
            
            dispatch({
                type: SET_MATCHES,
                payload: data ? data : []
            })  

        } catch (error) {

            console.log(error)
            
        }

    }

    const addPlayer = (player: Player) => {

        try {
            
            const newPlayer = {
                ...player,
                id: shortid.generate(),
                tournamet_id: state.config.tournament_id
            }

            const data = [ ...state.ranking, newPlayer ]

            setIntoStorage( "ranking", data )

            dispatch({
                type: ADD_PLAYER,
                payload: data
            })  

        } catch (error) {

            console.log(error)
            
        }

    }

    const deletePlayer = (player: Player) => {

        try {
            
            const data = state.ranking.filter( ( i : Player ) => i.id !== player.id )

            setIntoStorage( "ranking", data )

            dispatch({
                type: DELETE_PLAYER,
                payload: data
            })  

        } catch (error) {

            console.log(error)
            
        }

    }

    const generateMatches = () => {
        
        const players = [ ...state.ranking ]
        const matches = []

        if( players.length % 2 !== 0 ){

            players.push({ 
                id: shortid.generate(),
                name: "BYE",
                score: 0,
                victories: 0
            })

            setIntoStorage( "ranking", players )

            dispatch({
                type: ADD_PLAYER,
                payload: players
            })

        }

        for (let index = 0; index <= (players.length - 2); index = index + 2) {
            
            matches.push({
                
                id: shortid.generate(),
                stage_id: 0,
                group_id: 0,
                round_id: 0,
                status: 3,
                number: index,
                opponent1: {

                    id: players[index].id,
                    name: players[index].name,
                    score: 0,

                },
                opponent2: {

                    id: players[ index + 1 ].id,
                    name: players[ index + 1 ].name,
                    score: 0,

                }

            })
            
        }

        setIntoStorage( "matches", matches )

        dispatch({
            type: SET_MATCHES,
            payload: matches            
        })

    }

    const deleteTournament = () => {
        
        clearStorage([ "ranking", "matches" ])

        dispatch({
            type: CLEAR_STATE,
            payload: null
        })

    }

    return ( 

       <EliminationContext.Provider
            value = {{
                matches: state.matches,
                ranking: state.ranking,
                config: state.config,
                addPlayer,
                fetchRankig,
                fetchMatches,
                deletePlayer,
                generateMatches,
                deleteTournament
            }}
       >
           { children }
       </EliminationContext.Provider>

    );
}
 
export default EliminationState;