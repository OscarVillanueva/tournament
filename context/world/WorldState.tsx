import React, { FC, useReducer } from 'react';
import shortid from 'shortid'
import WorldReducer from './WorldReducer'
import WorldContext from './WorldContext'

// Models
import { Player } from "../../models";

// hooks
import useLocalStorage from '../../hooks/useLocalStorage'

// Tipos - actions
import { ADD_PLAYER, DELETE_PLAYER, FETCH_PLAYERS, UPDATE_PLAYER } from '../../types';

const WorldState: FC = ({ children }) => {

    const initialState = {
        ranking: [],
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

    return ( 
        <WorldContext.Provider
            value = {{
                ranking: state.ranking,
                operationError: state.operationError,
                fetchRankig,
                addPlayer,
                deletePlayer,
                updatePlayer
            }}
        >

            { children }

        </WorldContext.Provider>
    );
}
 
export default WorldState;