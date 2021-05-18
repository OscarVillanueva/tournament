import React, { FC, useReducer } from 'react';
import WorldReducer from './WorldReducer'
import WorldContext from './WorldContext'

// Models
import { Player } from "../../models";

// hooks
import useIndexDB from '../../hooks/useIndexDB'

// Tipos - actions
import { ADD_PLAYER, DELETE_PLAYER, FETCH_PLAYERS, SET_ERROR } from '../../types';

const WorldState: FC = ({ children }) => {

    const initialState = {
        ranking: [],
        operationError: false
    }

    const { openDB, saveIntoDatabase, retriveData, tryToOpenDatabase, deleteItem } = useIndexDB({
        databaseName: "World",
        indexes: [
            {
                index: "matches",
                keyPath: "matches",
                options: { unique: false }
            },
            {
                index: "Ranking",
                keyPath: "matches",
                options: { unique: false }
            }
        ]
    })

    const [ state, dispatch ] = useReducer( WorldReducer, initialState )

    const fetchRankig = () => {
        
        let data = []

        if( openDB ) 
            retriveData((e: EventTarget ) => {

                let cursor = e.target.result

                if( cursor ) {
                    
                    data.push({
                        id: cursor.key,
                        ...cursor.value
                    })
                    
                    cursor.continue()
                }
                else {

                    dispatch({
                        type: FETCH_PLAYERS,
                        payload: data
                    })

                }

            })

    }

    const addPlayer = (player: Player) => {

        saveIntoDatabase( 
            player, 
            () => dispatch({ type: ADD_PLAYER, payload: player }), 
            null, 
            () => dispatch({ type: SET_ERROR, payload: true })
        )

    }

    const deletePlayer = (player: Player) => {
        
        deleteItem(
            player.id,
            () => {
                console.log("Me llame")
                // dispatch({ type: SET_ERROR, payload: true })
            },
            () => dispatch({ type: DELETE_PLAYER, payload: player })
        )

    }

    return ( 
        <WorldContext.Provider
            value = {{
                ranking: state.ranking,
                operationError: state.operationError,
                openDB,
                fetchRankig,
                tryToOpenDatabase,
                addPlayer,
                deletePlayer
            }}
        >

            { children }

        </WorldContext.Provider>
    );
}
 
export default WorldState;