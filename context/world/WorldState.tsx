import React, { FC, useReducer } from 'react';
import shortid from 'shortid'
import WorldReducer from './WorldReducer'
import WorldContext from './WorldContext'

// Models
import { Player, Match } from "../../models";

// hooks
import useLocalStorage from '../../hooks/useLocalStorage'

// Tipos - actions
import { 
    ADD_PLAYER,
    CLEAR_STATE,
    CLOSE_MATCH,
    DELETE_PLAYER,
    FETCH_PLAYERS,
    SET_MATCHES,
    UPDATE_PLAYER,
    SET_SEMI_COUNTER
} from '../../types';

const WorldState: FC = ({ children }) => {

    const initialState = {
        ranking: [],
        matches: [],
        operationError: false,
        semiCounter: 0
    }

    const { getFromStorage, setIntoStorage, clearStorage } = useLocalStorage( "world" )

    const [ state, dispatch ] = useReducer( WorldReducer, initialState )

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
                id: shortid.generate()
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

    const updatePlayer = (player: Player) => {

        try {
            
            const data = state.ranking.map( ( i : Player ) => i.id !== player.id ? i : player )

            setIntoStorage( "ranking", data )

            dispatch({
                type: UPDATE_PLAYER,
                payload: data
            })  

        } catch (error) {

            console.log(error)
            
        }

    }

    const deleteTournament = () => {
        
        clearStorage([ "ranking", "matches" ])

        dispatch({
            type: CLEAR_STATE,
            payload: null
        })

    }

    const closeMatch = ( match: Match ) => {
        
        let matches = [ ...state.matches ]
        matches = matches.map( ( m: Match ) => m.id !== match.id ? m : match )
        matches.push( matches.shift() )
        
        setIntoStorage( "matches", matches )

        let ranking: Player[] = [ ...state.ranking ]

        if( !match.round.includes( "semifinal" ) && !match.round.includes( "Final" )) {

            console.log(`match.round`, match.round)

            ranking = ranking.map( ( player: Player ) => {
    
                let bridge : Player = null
    
                if( player.id === match.home.id ) bridge = match.home
    
                if( player.id === match.visitor.id ) bridge = match.visitor
    
                if ( bridge ){
    
                    player.defeats = player.defeats + bridge.defeats
                    player.score = player.score + bridge.diff
                    player.victories = player.victories + bridge.victories
    
                    return player
    
                }
                else return player
    
            })
    
            ranking.sort( ( a: Player, b: Player ) => 
                b.victories !== a.victories ? b.victories - a.victories : 
                b.score !== a.score ? b.score - a.score : b.defeats - a.defeats
            )
    
            setIntoStorage( "ranking", ranking )

        }

        dispatch({
            type: CLOSE_MATCH,
            payload: {
                matches,
                ranking
            }
        })

    }

    const generateSchedule = () => {
        
        const shuffledRanking = [ ...state.ranking ] 

        if( shuffledRanking.length % 2 !== 0 ) 
            shuffledRanking.unshift({ 
                id: shortid.generate(),
                name: "BYE",
                score: 0,
                victories: 0
            })

        const response = generateMatches( shuffledRanking )

        setIntoStorage( "matches", response )

        dispatch({
            type: SET_MATCHES,
            payload: response            
        })

    }

    const generateMatches = ( shuffledRanking: Array<Player> ) : Array< Match > => {
        
        const rounds = shuffledRanking.length - 1
        const middle = shuffledRanking.length / 2 
        const matches: Match[] = []

        const leftPart = shuffledRanking.splice( 0, middle )
        const rightPart = [ ...shuffledRanking.reverse() ]

        for (let index = 0; index < rounds; index++) {
            
            
            for (let pointer = 0; pointer < leftPart.length; pointer++) {
                
                matches.push({
                    id: shortid.generate(),
                    home: leftPart[pointer],
                    visitor: rightPart[pointer],
                    round: `Ronda ${index + 1}`,
                    closed: false
                })
                
            }

            const lastLeftPart = leftPart.splice( ( leftPart.length - 1), 1 )[0]
            rightPart.push( lastLeftPart )

            const firstRightPart = rightPart.shift()
            leftPart.splice( 1, 0, firstRightPart)

        }        

        return matches

    }

    const calcuteMatchesForSemis = () => {
        
        const semi1: Match = {
            id: shortid.generate(),
            home: {
                ...state.ranking[0],
                score: 0
            },
            visitor: {
                ...state.ranking[3],
                score: 0
            },
            closed: false,
            semi: true,
            round: "Primera semifinal"
        }

        const semi2: Match = {
            id: shortid.generate(),
            home: {
                ...state.ranking[1],
                score: 0
            },
            visitor: {
                ...state.ranking[2],
                score: 0
            },
            closed: false,
            semi: true,
            round: "Segunda semifinal"
        }

        const bridge = [ semi1, semi2, ...state.matches ]

        // setIntoStorage( "matches", bridge )

        dispatch({
            type: SET_MATCHES,
            payload: bridge
        })

    }

    const setSemiCounter = (value: number) => {
        
        dispatch({
            type: SET_SEMI_COUNTER,
            payload: value
        })

    }

    const calcuteMatchForFinal = () => {
        
        const semis = state.matches.filter( (match: Match) => match.semi )

        const challengers: Player[] = []   
        
        semis.forEach(( match: Match ) => {
            
            if( match.home.score > match.visitor.score ) 
                challengers.push({ 
                    ...match.home,
                    score: 0
                })

            else 
                challengers.push({ 
                    ...match.visitor,
                    score: 0
                })

        })

        const finalMatch: Match = {
            id: shortid.generate(),
            home: challengers[0],
            visitor: challengers[1],
            closed: false,
            semi: false,
            round: "Final"
        }
        
        const bridge = [ finalMatch, ...state.matches ]

        // setIntoStorage( "matches", bridge )

        dispatch({
            type: SET_MATCHES,
            payload: bridge
        })
        
    }

    return ( 
        <WorldContext.Provider
            value = {{
                ranking: state.ranking,
                matches: state.matches,
                operationError: state.operationError,
                semiCounter: state.semiCounter,
                fetchRankig,
                fetchMatches,
                addPlayer,
                deletePlayer,
                updatePlayer,
                generateSchedule,
                deleteTournament,
                closeMatch,
                calcuteMatchesForSemis,
                calcuteMatchForFinal,
                setSemiCounter
            }}
        >

            { children }

        </WorldContext.Provider>
    );
}
 
export default WorldState;