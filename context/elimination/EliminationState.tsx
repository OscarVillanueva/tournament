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
    CLOSE_MATCH, 
    DELETE_PLAYER, 
    FETCH_PLAYERS, 
    NEXT_ROUND, 
    SET_MATCHES,
    INIT_TOURNAMENT

} from "../../types";

const EliminationState: FC = ({ children }) => {

    const initialState = {
        ranking: [],
        matches: [],
        currentRound: 0,
        remainingMatches: -1,
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
            let count = 0
            let currentRound = 0

            if( data ) {

                count = data.length

                if( data.some( ( m:any ) => m.opponent2.name === "BYE" ) ) 
                    count = count - 1

                const open = data.filter( (m: any) => !m.closed )
                currentRound  = data.reduce( 
                    ( total, match ) => total < match.round_id ? match.round_id : total, 0
                )

                count = open.length

            }
            
            dispatch({
                type: INIT_TOURNAMENT,
                payload: {
                    matches: data ? data : [],
                    count,
                    currentRound
                }
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
        let matches = []
        let less = 0

        if( players.length % 2 !== 0 ){

            players.push({ 
                id: shortid.generate(),
                name: "BYE",
                score: 0,
                victories: 0
            })

            setIntoStorage( "ranking", players )

            less = less - 1

            dispatch({
                type: ADD_PLAYER,
                payload: players
            })

        }

        matches = getMatches( players, 0)

        setIntoStorage( "matches", matches )

        dispatch({
            type: SET_MATCHES,
            payload: {
                matches,
                count: matches.length + less
            }            
        })

    }

    const deleteTournament = () => {
        
        clearStorage([ "ranking", "matches" ])

        dispatch({
            type: CLEAR_STATE,
            payload: null
        })

    }

    const updateScore = (match: any) => {

        let matches = [ ...state.matches ]

        matches = matches.map( m => m.id === match.id ? match : m)
        
        setIntoStorage( "matches", matches )

        dispatch({
            type: CLOSE_MATCH,
            payload: matches            
        })

    }

    const nextRound = () => {
        
        const matchesOfRound = state.matches.filter( (m: any) => m.round_id === state.currentRound )
        let less = 0

        const winners = matchesOfRound.map( (m: any) => {

            if( m.opponent1.result === "win" ) return m.opponent1

            if( m.opponent2.result === "win" ) return m.opponent2

        })

        if(winners.length === 1) return 

        if( winners.length % 2 !== 0 ) {

            winners.push( state.ranking.find( ( player: Player ) => player.name = "BYE" ) )
            less = less - 1
        }

        const newMatches = getMatches( winners, ( state.currentRound + 1 ))
        
        const matches = [ ...state.matches, ...newMatches ]

        setIntoStorage( "matches", matches )

        dispatch({
            type: NEXT_ROUND,
            payload: {
                matches,
                count: newMatches.length + less
            }
        })

    }

    const getMatches = ( players: Player[], round: number): any[] => {
        
        let matches = []

        for (let index = 0; index <= (players.length - 2); index = index + 2) {
            
            matches.push({
                
                id: shortid.generate(),
                stage_id: 0,
                group_id: 0,
                round_id: round,
                status: 3,
                number: index,
                closed: false,
                opponent1: {

                    id: players[index].id,
                    name: players[index].name,
                    score: 0,
                    result: players[ index + 1 ].name === "BYE" ? "win" : ""

                },
                opponent2: {

                    id: players[ index + 1 ].id,
                    name: players[ index + 1 ].name,
                    score: 0,
                    result: players[ index + 1 ].name === "BYE" ? "loss" : ""

                }

            })
            
        }

        return matches
    }

    return ( 

       <EliminationContext.Provider
            value = {{
                matches: state.matches,
                ranking: state.ranking,
                config: state.config,
                currentRound: state.currentRound,
                remainingMatches: state.remainingMatches,
                addPlayer,
                fetchRankig,
                fetchMatches,
                deletePlayer,
                generateMatches,
                deleteTournament,
                updateScore,
                nextRound
            }}
       >
           { children }
       </EliminationContext.Provider>

    );
}
 
export default EliminationState;