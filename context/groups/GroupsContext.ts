import { createContext } from 'react';

// Models
import { Group, Player } from "../../models";

type GroupsContent = {

    groups: Group[]
    addPlayer: (player: Player) => void
    fetchRankig: () => void
    deleteTournament: () => void

}

const GroupsContext = createContext<GroupsContent>({
    groups: [],
    addPlayer: () => {},
    fetchRankig: () => {},
    deleteTournament: () => {}
})

export default GroupsContext