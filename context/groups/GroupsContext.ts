import { createContext } from 'react';

// Models
import { Group, Player } from "../../models";

type GroupsContent = {

    groups: Group[],
    addPlayer: (player: Player) => void

}

const GroupsContext = createContext<GroupsContent>({
    groups: [],
    addPlayer: () => {}
})

export default GroupsContext