import { createContext } from "react";

import { Player, Match } from "../../models/index";

export type EliminationContet = {
    matches: Match[]
    ranking: Player[],
    addPlayer: ( player: Player ) => void
}

const EliminationContext = createContext<EliminationContet>({
    matches: [],
    ranking: [],
    addPlayer: (player: Player) => {}
})

export default EliminationContext