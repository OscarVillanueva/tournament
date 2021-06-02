import { createContext } from "react";

import { Player, Match, Tournament, TournamentType, TournamentFinal } from "../../models/index";

export type EliminationContet = {
    matches: any[]
    ranking: Player[],
    config: Tournament,
    addPlayer: ( player: Player ) => void
    fetchRankig: () => void
    fetchMatches: () => void
    generateMatches: () => void
    deleteTournament: () => void
    deletePlayer: (player: Player ) => void
    updateScore: (match: any ) => void
}

const EliminationContext = createContext<EliminationContet>({
    matches: [],
    ranking: [],
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
    updateScore: (match: any) => {},
    deletePlayer: (player: Player ) => {},
})

export default EliminationContext