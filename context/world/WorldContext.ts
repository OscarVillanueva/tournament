import { createContext } from "react";

import { Player } from "../../models/index";

export type WorldContent = {
    ranking: Player[],
    openDB: boolean,
    operationError: boolean,
    fetchRankig: () => void,
    tryToOpenDatabase: () => void,
    addPlayer: (player: Player) => void,
    deletePlayer: (player: Player) => void
}

const WorldContext = createContext<WorldContent>({
    ranking: [],
    openDB: false,
    operationError: false,
    fetchRankig: () => {},
    tryToOpenDatabase: () => {},
    addPlayer: (player: Player) => {},
    deletePlayer: (player: Player) => {}
})

export default WorldContext

