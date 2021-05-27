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

        const schedule = roundsSeparation( response, shuffledRanking )
        
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

    const roundsSeparation = ( matches: Array<Match>, ranking: Array<Player> ) : Match[] => {
        
        const schedule = {}
        const byes = []
        const matchesPerRound = ranking.length / 2
        const rounds = ranking.length - 1

        ranking.shift()

        for (let index = 0; index < rounds; index++) 
            schedule[ `round-${ index + 1 }` ] = [ {round: `Ronda ${ index + 1 }` ,...matches.shift()} ]

        for (let index = 1; index <= rounds; index++) {
            
            let games = 1
            let added = true
            let current: Player = null
            let byesIterator = byes[Symbol.iterator]()
            let rankingIterator = ranking[ Symbol.iterator ]()

            while( games < matchesPerRound ) {

                if( added ) current = next( schedule[`round-${ index }`], byesIterator, rankingIterator )

                let match = matches.findIndex( 
                    m => m.home.id === current.id || m.visitor.id === current.id 
                )

                if( lookFor( schedule[`round-${ index }`], matches[ match ], matchesPerRound) ) {

                    schedule[ `round-${ index }` ].push({ 
                        ...matches[ match ],
                        round: `Ronda ${ index }`
                    })

                    if( matches[ match ].visitor.name === "BYE" ) 
                        byes.push( matches[ match ].home )
                        

                    matches.splice( match, 1 )

                    games = games + 1
                    added = true
                    

                }
                else {

                    let temp = matches[ match ]
                    matches.push( temp )

                    matches.splice( match, 1 )
                    
                    added = false

                }

            }

        }

        const result = Object.entries( schedule ).map( i => i[1] ) 

        return result.flat(1) as Match[]

    }

    const next = ( 
        matches: Array<Match>, 
        byes: IterableIterator<Player>, players: IterableIterator<Player> ) : Player => {
        
        let flag = true
        let search: any = { value: null, done: false }

        while ( flag && !search.done ) {

            search = byes.next()

            if( search.done ) search = players.next()

            if( !search.done ) {

                const isInMatches = matches.find( m => {

                    if( m.home.id === search.value.id || m.visitor.id === search.value.id)
                        return m

                })
                    
                flag = isInMatches ? true : false
            }


        }

        return search.value

    }

    const lookFor = ( games: Match[], match: Match, matchesPerRound: number ) : boolean => {
        
        if( games.length === 0 ) return true

        if( matchesPerRound === games.length || !match ) return false

        const isInTheRound = games.find( game => {
            
            if( game.home.id === match.home.id  || game.visitor.id === match.home.id )
                return game

            if( game.home.id === match.visitor.id  || game.visitor.id === match.visitor.id )
                return game

        })

        return isInTheRound ? false : true

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