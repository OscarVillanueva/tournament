import React, { FC, useReducer } from 'react'
import shortid from 'shortid'
import _ from 'lodash'

// Context y Reducer
import GroupsContext from './GroupsContext'
import GroupsReducer from './GroupsReducer'

// Modelos
import { Player, Group, Match, Stage } from "../../models";
import { DragElement } from '../../hooks/useDragAndDrop'

// Hooks
import useLocalStorage from '../../hooks/useLocalStorage'

// Tipos
import { 
    CLEAR_STATE,
    SET_GROUPS, 
    SET_MATCHES
} from '../../types';

const GroupsState: FC = ({ children }) => {

    const initialState = {
        groups: [],
        matches: []
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

    const deletePlayer = (id: string, group: string) => {
        
        // Identificamos el grupo
        const groupIndex = state.groups.findIndex( ( g: Group ) => g.name === group )

        // Eliminamos al jugador
        const newPlayers = state.groups[ groupIndex ].players.filter(
            ( player: Player ) => player.id !== id 
        )

        // Actualizamos el state
        const bridge = [ ...state.groups ]
        bridge[ groupIndex ].players = newPlayers

        // Agregamos al state y al storage
        setIntoStorage( "ranking", bridge )

        dispatch({
            type: SET_GROUPS,
            payload: bridge
        })

    }

    const startTournament = () => {
        
        let matches = []

        state.groups.forEach( ( group: Group ) => {
            
            matches = matches.concat( generateMatches( [ ...group.players ], group.name ) )

        })

        // Ordenamos por rondas
        matches = _.sortBy( matches, "round" )

        // Agregamos al state y al storage
        setIntoStorage( "matches", matches )

        dispatch({
            type: SET_MATCHES,
            payload: matches
        })

    }

    const generateMatches = ( shuffledRanking: Array<Player>, group: String ) : Array< Match > => {
        
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
                    round: `Ronda ${index + 1} - ${ group }`,
                    closed: false,
                    stage: Stage.regular
                })
                
            }

            const lastLeftPart = leftPart.splice( ( leftPart.length - 1), 1 )[0]
            rightPart.push( lastLeftPart )

            const firstRightPart = rightPart.shift()
            leftPart.splice( 1, 0, firstRightPart)

        }        

        return matches

    }

    const closeMatch = ( match: Match ) => {
        
        // buscar el match y cambiarlo
        let matches = [ ...state.matches ]
        matches = matches.map( ( m: Match ) => m.id !== match.id ? m : match )
        matches.push( matches.shift() )

        // Modificar tabla del grupo
        if( match.stage === Stage.regular ) {

            // Identificar el grupo
            const groupName = match.round.split("-")[1].trim()
            const groupIndex = state.groups.findIndex( ( g: Group ) => g.name === groupName ) 

            // Buscar al jugador y actulizarlo
            let players: Player[] = [ ...state.groups[ groupIndex ].players ]

            players = players.map( ( player: Player ) => {
    
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

            // Reordenar el grupo
            players.sort( ( a: Player, b: Player ) => 
                b.victories !== a.victories ? b.victories - a.victories : 
                b.score !== a.score ? b.score - a.score : b.defeats - a.defeats
            )

            const groups = [ ...state.groups ]
            groups[ groupIndex ].players = players

            // Agregamos al state y al storage
            // setIntoStorage( "ranking", groups )

            dispatch({
                type: SET_GROUPS,
                payload: groups
            })

        }

        // Actualizar y Guardar el state 
        // setIntoStorage( "matches", matches )

        dispatch({
            type: SET_MATCHES,
            payload: matches
        })
    }

    const eliminationRound = () => {
        
        // Sacamos a los jugadores, los primeros lugares, completamos con los segundos y terceros
        const players = getPlayersForEliminationRound()

        // Marcamos los jugadores que pasaron a la siguiente ronda
        selectNextStagePlayer( players )
        
        // Generarmos partidos de eliminación directa primero contra ultimo . . .
        let newMatches: Match[] = []

        for (let index = 0; index <= (players.length - 2); index = index + 2) {

            newMatches.push({
                id: shortid.generate(),
                round: players.length === 2 ? "Final" :"Eliminación",
                home: { ...players[ index ], score: 0},
                visitor: { ...players[ index + 1], score: 0},
                closed: false,
                stage: players.length === 2 ? Stage.final : Stage.semis
            })

        }

        newMatches = newMatches.concat( state.matches )

        // Guardamos y actualizamos el state
        // setIntoStorage( "matches",  newMatches)

        dispatch({
            type: SET_MATCHES,
            payload: newMatches
        })
    }

    const selectNextStagePlayer = ( players: any ) => {
        
        let groups = [ ...state.groups ]

        players.forEach(( player: any ) => {
            
            groups[ player.group ].players = groups[ player.group ].players.map( 
                ( p: Player ) => p.id === player.id ? player : p
            )

        })

        // Actualizamos el state de grupos
        // setIntoStorage( "ranking", groups )
        dispatch({
            type: SET_GROUPS,
            payload: groups
        })

    }

    const getPlayersForEliminationRound = () : Player[] => {
        
        const groups = [ ...state.groups ]

        // Inicialiazamos el arreglo con los primeros lugares
        let players: Player[] = groups.map( ( group: Group, index ) => 
            ({ ...group.players[0], tournament_id: "next", group: index }) 
        )
        
        // Sacar a los mejores segun el index
        const bridge = groups.map( ( group: Group, index ) => ({ ...group.players[ 1 ], group: index}) )

        // Ordenamos según
        bridge.sort( ( a: Player, b: Player ) => 
            b.victories !== a.victories ? b.victories - a.victories : 
            b.score !== a.score ? b.score - a.score : b.defeats - a.defeats
        )
    
        // Preguntar cuantos faltan y agregar esos
        const missing = nextPowerOf2( players.length ) - players.length
        const nextPlayers = bridge.slice( 0, missing ).map( 
            ( player: Player ) => ({ ...player, tournament_id: "next" }) 
        )

        players = players.concat( nextPlayers )

        return players

    }

    const nextPowerOf2 = ( n: number ) : number => {

        var count = 0;
        
        // First n in the below condition
        // is for the case where n is 0
        if (n && !(n & (n - 1)))
            return n;
        
        while( n != 0)
        {
            n >>= 1;
            count += 1;
        }
        
        return 1 << count;

    }
 

    return ( 

        <GroupsContext.Provider
            value = {{
                groups: state.groups,
                matches: state.matches,
                addPlayer,
                fetchMatches,
                fetchRankig,
                deleteTournament,
                exchangePlayers,
                deletePlayer,
                startTournament,
                closeMatch,
                eliminationRound
            }}
        >

            { children }

        </GroupsContext.Provider>

    );
}
 
export default GroupsState;