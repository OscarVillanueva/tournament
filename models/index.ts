export interface Player {
    id?: number,
    name: string,
    victories: number,
    score: number
}

export interface Match {
    id: string,
    round: string,
    home: Player,
    visitor: Player
}