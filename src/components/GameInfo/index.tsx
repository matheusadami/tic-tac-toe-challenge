import { GameSquare, Player, Symbol } from '@/utils/types'

interface Props {
  symbols: Symbol[]
  squares: GameSquare[]
  currentPlayer: Player
}

export function GameInfo({ symbols, squares, currentPlayer }: Props) {
  function getAmountPlaysBySymbol(symbol: Symbol) {
    return squares.filter((e) => e.player?.symbol.name === symbol.name).length
  }

  return (
    <div className="flex flex-col justify-evenly items-center h-full">
      <div className="flex flex-col justify-center items-start p-4 gap-4 rounded-xl bg-gray-700 border-opacity-70">
        {symbols.map((symbol) => (
          <div key={symbol.name} className="flex flex-row justify-center">
            <span
              className={`material-icons-outlined ${symbol.className} !text-4xl`}>
              {symbol.iconName}
            </span>
            <div className="text-2xl text-gray-200 font-medium">
              <span className="ml-2"> =</span>
              <span className="ml-3">{getAmountPlaysBySymbol(symbol)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center items-start p-4 rounded-xl bg-gray-700 border-opacity-70">
        <div className="text-2xl text-gray-200 font-medium mr-3">Player:</div>
        <span
          hidden={!currentPlayer}
          className={`material-icons-outlined ${currentPlayer.symbol.className} !text-3xl`}>
          {currentPlayer.symbol.iconName}
        </span>
      </div>
    </div>
  )
}
