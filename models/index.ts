export interface Player {
    id?: number,
    name: string,
    victories: number,
    score: number,
    defeats: number,
    diff?: number
}

export interface Match {
    id: string,
    round: string,
    home: Player,
    visitor: Player
    closed: boolean
}