import { createContext } from "react";

import { Player, Match } from "../../models/index";

export type WorldContent = {
    ranking: Player[],
    matches: Match[],
    operationError: boolean,
    fetchRankig: () => void,
    fetchMatches: () => void,
    addPlayer: (player: Player) => void,
    deletePlayer: (player: Player) => void,
    updatePlayer: (player: Player) => void
    generateSchedule: () => void,
    deleteTournament: () => void,
    closeMatch: (match: Match) => void
}

const WorldContext = createContext<WorldContent>({
    ranking: [],
    matches: [],
    operationError: false,
    fetchRankig: () => {},
    fetchMatches: () => {},
    addPlayer: (player: Player) => {},
    deletePlayer: (player: Player) => {},
    updatePlayer: (player: Player) => {},
    generateSchedule: () => {},
    deleteTournament: () => {},
    closeMatch: (match: Match) => {},
})

export default WorldContext

