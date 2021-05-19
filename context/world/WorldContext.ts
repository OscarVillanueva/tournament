import { createContext } from "react";

import { Player } from "../../models/index";

export type WorldContent = {
    ranking: Player[],
    operationError: boolean,
    fetchRankig: () => void,
    addPlayer: (player: Player) => void,
    deletePlayer: (player: Player) => void,
    updatePlayer: (player: Player) => void
}

const WorldContext = createContext<WorldContent>({
    ranking: [],
    operationError: false,
    fetchRankig: () => {},
    addPlayer: (player: Player) => {},
    deletePlayer: (player: Player) => {},
    updatePlayer: (player: Player) => {},
})

export default WorldContext

