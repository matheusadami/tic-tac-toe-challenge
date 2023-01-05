export enum EndGameType {
  hasWinner,
  tiedGame
}

export interface GameSquare {
  position: number
  player?: Player
  className?: string
}

export interface Symbol {
  name: string
  iconName: string
  className: string
}

export interface Player {
  code: number
  name: string
  symbol: Symbol
  switchToCodePlayer: number
}

export interface EndGameMessage {
  type: EndGameType
  winner?: Player
}
