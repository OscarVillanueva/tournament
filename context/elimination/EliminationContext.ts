import { createContext } from "react";

import { Player, Match, Tournament, TournamentType, TournamentFinal } from "../../models/index";

export type EliminationContet = {
    matches: any[]
    ranking: Player[],
    config: Tournament,
    currentRound: number,
    remainingMatches: number,
    addPlayer: ( player: Player ) => void
    fetchRankig: () => void
    fetchMatches: () => void
    generateMatches: () => void
    deleteTournament: () => void
    nextRound: () => void
    deletePlayer: (player: Player ) => void
    updateScore: (match: any ) => void
}

const EliminationContext = createContext<EliminationContet>({
    matches: [],
    ranking: [],
    currentRound: 0,
    remainingMatches: 0,
    config: {
        id: "0",
        tournament_id: "0",
        name: "RoRol - Un solo partido",
        type: TournamentType.single,
        number: 0,
        settings: {
            size: 16,
            grandFinal: TournamentFinal.single,
            matchesChildCount: 0,
            seedOrdering: [
                "natural",
                "natural",
                "reverse_half_shift",
                "reverse"
            ]
        }
    },
    addPlayer: (player: Player) => {},
    fetchRankig: () => {},
    generateMatches: () => {},
    fetchMatches: () => {},
    deleteTournament: () => {},
    nextRound: () => {},
    updateScore: (match: any) => {},
    deletePlayer: (player: Player ) => {},
})

export default EliminationContext