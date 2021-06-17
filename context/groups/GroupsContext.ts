import { createContext } from 'react';
import { DragElement } from '../../hooks/useDragAndDrop';

// Models
import { Group, Match, Player } from "../../models";

type GroupsContent = {

    groups: Group[],
    matches: Match[],
    nextRoundIndex: number
    addPlayer: (player: Player) => void
    fetchRankig: () => void
    fetchMatches: () => void
    deleteTournament: () => void
    startTournament: () => void
    eliminationRound: () => void
    getNextRound: () => void
    exchangePlayers: (source: DragElement, dest: DragElement) => void
    deletePlayer: (id: string, group: string) => void
    closeMatch: (match: Match ) => void

}

const GroupsContext = createContext<GroupsContent>({
    groups: [],
    matches: [],
    nextRoundIndex: 0,
    addPlayer: () => {},
    fetchRankig: () => {},
    fetchMatches: () => {},
    deleteTournament: () => {},
    eliminationRound: () => {},
    getNextRound: () => {},
    exchangePlayers: (source: DragElement, dest: DragElement) => {},
    deletePlayer: (id: string, group: string) => {},
    startTournament: () => {},
    closeMatch: (match: Match ) => {}
})

export default GroupsContext