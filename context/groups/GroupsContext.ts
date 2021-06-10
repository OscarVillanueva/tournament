import { createContext } from 'react';

// Models
import { Group, Player } from "../../models";

type GroupsContent = {

    groups: Group[]
    addPlayer: (player: Player) => void
    fetchRankig: () => void

}

const GroupsContext = createContext<GroupsContent>({
    groups: [],
    addPlayer: () => {},
    fetchRankig: () => {}
})

export default GroupsContext