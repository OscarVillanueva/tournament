import React, { FC, useReducer } from 'react';
import shortid from 'shortid'
import WorldReducer from './WorldReducer'
import WorldContext from './WorldContext'

// Models
import { Player, Match } from "../../models";

// hooks
import useLocalStorage from '../../hooks/useLocalStorage'

// Tipos - actions
import { ADD_PLAYER, DELETE_PLAYER, FETCH_PLAYERS, SET_MATCHES, UPDATE_PLAYER } from '../../types';

const WorldState: FC = ({ children }) => {

    const initialState = {
        ranking: [],
        matches: [],
        operationError: false,
    }

    const { getFromStorage, setIntoStorage } = useLocalStorage( "world" )

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

    const generateSchedule = () => {
        
        const shuffledRanking = shuffle( state.ranking )

        if( shuffledRanking.length % 2 !== 0 ) 
            shuffledRanking.push({ 
                id: shortid.generate(),
                name: "BYE",
                score: 0,
                victories: 0
            })


        const response = generateMatches( shuffledRanking )

        const schedule = roundsSeparation( response )

        setIntoStorage( "matches", schedule )

        dispatch({
            type: SET_MATCHES,
            payload: schedule
        })


    }

    const generateMatches = ( shuffledRanking: Array<any> ) : Array< any > => {
        
        const rawMatches = []

        for (let index = 0; index < shuffledRanking.length; index++) {

            const home = shuffledRanking[index];

            for (let j = index + 1; j < shuffledRanking.length; j++) {

                const visitor = shuffledRanking[j];

                rawMatches.push({
                    id: shortid.generate(),
                    home,
                    visitor
                })
                
            }
            
        }

        return rawMatches

    }

    const roundsSeparation = ( matches: Array<any> ) : Match[] => {
        
        let schedule = {}
        let draws: Match[] = []
        const matchesPerRound = state.ranking.length / 2
        const rounds = state.ranking.length - 1

        for (let index = 0; index <= matchesPerRound; index++) 
            schedule[ `round-${ index + 1 }` ] = []

        while( matches.length > 0 ) {

            const currentGame = matches.shift()
            let flag = true
            let counter = 1

            while ( flag && counter <= rounds) {

                if( lookFor( schedule[ `round-${ counter }` ], currentGame ) ) {

                    schedule[ `round-${ counter }` ].push({ 
                        ...currentGame,
                        round: `Ronda ${ counter }`
                    }) 
                    flag = false

                }

                counter = counter + 1

            }

        }

        const result= Object.entries( schedule ).map( i => i[1] ) 

        return result.flat(1) as Match[]

    }

    const lookFor = ( games: Match[], match: Match ) : boolean => {
        
        if( games.length === 0 ) return true

        let flag = true
        let counter = 0

        while( flag && counter < games.length) {

            let currentGame = games[ counter ]

            if( currentGame.home.id === match.home.id  || currentGame.visitor.id === match.home.id )
                flag = false

            if( currentGame.home.id === match.visitor.id  || currentGame.visitor.id === match.visitor.id )
                flag = false

            counter = counter + 1

        }

        return flag

    }

    const shuffle = ( ranking : any ) : Array<any> => {

        let array = [ ...ranking ]
        let currentIndex = array.length
        let temporaryValue : any
        let randomIndex : any
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;

        }
      
        return array;

    }

    return ( 
        <WorldContext.Provider
            value = {{
                ranking: state.ranking,
                matches: state.matches,
                operationError: state.operationError,
                fetchRankig,
                fetchMatches,
                addPlayer,
                deletePlayer,
                updatePlayer,
                generateSchedule
            }}
        >

            { children }

        </WorldContext.Provider>
    );
}
 
export default WorldState;