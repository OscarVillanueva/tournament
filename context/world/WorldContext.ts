import { createContext } from "react";

import { Player, Match } from "../../models/index";

export type WorldContent = {
    ranking: Player[],
    matches: Match[],
    operationError: boolean,
    semiCounter: number,
    fetchRankig: () => void,
    fetchMatches: () => void,
    addPlayer: (player: Player) => void,
    deletePlayer: (player: Player) => void,
    updatePlayer: (player: Player) => void
    generateSchedule: () => void,
    deleteTournament: () => void,
    closeMatch: (match: Match) => void,
    calcuteMatchesForSemis: () => void,
    setSemiCounter: (value: number) => void
}

const WorldContext = createContext<WorldContent>({
    ranking: [],
    matches: [],
    operationError: false,
    semiCounter: 0,
    fetchRankig: () => {},
    fetchMatches: () => {},
    addPlayer: (player: Player) => {},
    deletePlayer: (player: Player) => {},
    updatePlayer: (player: Player) => {},
    generateSchedule: () => {},
    deleteTournament: () => {},
    closeMatch: (match: Match) => {},
    calcuteMatchesForSemis: () => {},
    setSemiCounter: (value: number) => {},
})

export default WorldContext

