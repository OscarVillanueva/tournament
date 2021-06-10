export interface Player {
    id?: string,
    name: string,
    victories: number,
    score: number,
    defeats: number,
    diff?: number,
    tournament_id?: string
}

export interface Match {
    id: string,
    round: string,
    home: Player,
    visitor: Player
    closed: boolean,
    stage: Stage
}

export interface Tournament {
    id: string,
    tournament_id: string,
    name: string,
    number: number,
    type: TournamentType,
    settings: Config
}

export interface Config {
    size: number,
    grandFinal: TournamentFinal,
    matchesChildCount: number,
    seedOrdering: [
        "natural",
        "natural",
        "reverse_half_shift",
        "reverse"
    ]
}

export enum Stage {
    regular,
    semis,
    final
}

export enum TournamentType {

    single = "single_elimination",
    double = "double_elimination",

}

export enum TournamentFinal {

    single = "single",
    double = "double",

}

export interface Action {
    type: string,
    payload: any
}

export interface Group {
    id: string,
    name: string,
    players: Player[]
}