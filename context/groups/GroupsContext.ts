import { createContext } from 'react';
import { DragElement } from '../../hooks/useDragAndDrop';

// Models
import { Group, Player } from "../../models";

type GroupsContent = {

    groups: Group[]
    addPlayer: (player: Player) => void
    fetchRankig: () => void
    deleteTournament: () => void
    exchangePlayers: (source: DragElement, dest: DragElement) => void
    deletePlayer: (id: string, group: string) => void

}

const GroupsContext = createContext<GroupsContent>({
    groups: [],
    addPlayer: () => {},
    fetchRankig: () => {},
    deleteTournament: () => {},
    exchangePlayers: (source: DragElement, dest: DragElement) => {},
    deletePlayer: (id: string, group: string) => {}
})

export default GroupsContext