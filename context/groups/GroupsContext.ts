import { createContext } from 'react';
import { DragElement } from '../../hooks/useDragAndDrop';

// Models
import { Group, Match, Player } from "../../models";

type GroupsContent = {

    groups: Group[],
    matches: Match[],
    addPlayer: (player: Player) => void
    fetchRankig: () => void
    deleteTournament: () => void
    startTournament: () => void
    exchangePlayers: (source: DragElement, dest: DragElement) => void
    deletePlayer: (id: string, group: string) => void

}

const GroupsContext = createContext<GroupsContent>({
    groups: [],
    matches: [],
    addPlayer: () => {},
    fetchRankig: () => {},
    deleteTournament: () => {},
    exchangePlayers: (source: DragElement, dest: DragElement) => {},
    deletePlayer: (id: string, group: string) => {},
    startTournament: () => {}
})

export default GroupsContext