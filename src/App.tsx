import { useState } from 'react'

enum EndGameType {
  hasWinner,
  tiedGame
}

interface GameSquare {
  position: number
  player?: Player
  className?: string
}

interface Symbol {
  name: string
  iconName: string
  className: string
}

interface Player {
  code: number
  name: string
  symbol: Symbol
  switchToCodePlayer: number
}

interface EndGameMessage {
  type: EndGameType
  winner?: Player
}

const symbolX: Symbol = {
  name: 'X',
  iconName: 'close',
  className: 'text-9xl text-green-500'
}

const symbolO: Symbol = {
  name: 'O',
  iconName: 'circle',
  className: 'text-8xl text-red-500'
}

const playerOne: Player = {
  code: 1,
  name: 'Player One',
  symbol: symbolX,
  switchToCodePlayer: 2
}

const playerTwo: Player = {
  code: 2,
  name: 'Player Two',
  symbol: symbolO,
  switchToCodePlayer: 1
}

const winningPositions: number[][] = [
  [1, 5, 9],
  [3, 5, 7],
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
]

const initialGameSquares: GameSquare[] = [
  { position: 1, className: 'border-b-4 border-gray-400 border-opacity-70' },
  {
    position: 2,
    className: 'border-x-4 border-b-4 border-gray-400 border-opacity-70'
  },
  { position: 3, className: 'border-b-4 border-gray-400 border-opacity-70' },
  { position: 4, className: 'border-b-4 border-gray-400 border-opacity-70' },
  {
    position: 5,
    className: 'border-x-4 border-b-4 border-gray-400 border-opacity-70'
  },
  { position: 6, className: 'border-b-4 border-gray-400 border-opacity-70' },
  { position: 7 },
  { position: 8, className: 'border-x-4 border-gray-400 border-opacity-70' },
  { position: 9 }
]

export function App() {
  const [currentPlayer, setCurrentPlayer] = useState({ ...playerOne })
  const [squares, setGameSquares] = useState([...initialGameSquares])

  const endGameMessage = checkEndGame()

  function checkEndGame(): EndGameMessage | undefined {
    const amountClickedSquares = squares.filter((e) => !!e.player).length
    // The game doesn't end before the fifth play
    if (amountClickedSquares >= 5) {
      for (const positions of winningPositions) {
        let codes = getCodePlayersByPositions(positions)
        let isHasWinner = codes.every((e) => !!e && e === codes.at(0))
        if (isHasWinner) {
          let endGameMessage = {
            type: EndGameType.hasWinner,
            winner: getPlayerByCode(codes.at(0)!)
          }
          return endGameMessage
        }
      }
    }

    if (amountClickedSquares >= 9) {
      let endGameMessage = { type: EndGameType.tiedGame }
      return endGameMessage
    }
  }

  function getCodePlayersByPositions(positions: number[]) {
    let codes: [number?, number?, number?] = []
    for (const position of positions) {
      codes.push(squares.at(position - 1)?.player?.code)
    }
    return codes
  }

  function getPlayerByCode(code: number) {
    switch (code) {
      case 1:
        return playerOne
      case 2:
        return playerTwo
    }
  }

  function switchCurrentPlayer() {
    setCurrentPlayer(getPlayerByCode(currentPlayer.switchToCodePlayer)!)
  }

  function onPlay(clickedSquare: GameSquare, index: number) {
    if (!clickedSquare.player) {
      clickedSquare.player = currentPlayer

      let currentSquares = squares
      currentSquares.splice(index, 1, clickedSquare)

      setGameSquares(currentSquares)
      switchCurrentPlayer()
    }
  }

  function onPlayAgain() {
    setCurrentPlayer({ ...playerOne })
    setGameSquares([...initialGameSquares])
  }

  return (
    <div className="container flex flex-col mx-auto justify-evenly items-center w-screen h-screen">
      <div className="text-4xl text-gray-200 font-medium max-lg:text-lg">
        Tic-Tac-Toe Challenge
      </div>
      <div className="flex mx-auto justify-evenly items-center w-full">
        <div
          className={`grid grid-cols-3 grid-rows-3 ${
            !!endGameMessage ? 'pointer-events-none' : ''
          }`}>
          {squares.map((square, index) => (
            <div
              key={square.position}
              onClick={(e) => onPlay({ ...square }, index)}
              className={`flex justify-center items-center w-36 h-36 p-2 rounded-2xl cursor-pointer ${square.className}`}>
              <span
                hidden={!square.player}
                className={`material-icons-outlined ${square.player?.symbol.className}`}>
                {square.player?.symbol.iconName}
              </span>
            </div>
          ))}
        </div>
        <div className="h-full">
          <div className="flex flex-col justify-evenly items-center h-full">
            {!!endGameMessage && (
              <>
                <div className="flex flex-col justify-center items-center p-4 gap-4 rounded-xl bg-gray-700 border-opacity-70">
                  {endGameMessage.type === EndGameType.hasWinner && (
                    <div className="flex flex-col items-center text-2xl text-gray-200 font-medium px-8">
                      <span
                        className={`material-icons-outlined ${endGameMessage.winner?.symbol.className} !text-7xl m-2`}>
                        {endGameMessage.winner?.symbol.iconName}
                      </span>
                      <span>Winner!</span>
                    </div>
                  )}
                  {endGameMessage.type === EndGameType.tiedGame && (
                    <div className="flex flex-col items-center text-2xl text-gray-200 font-medium px-8">
                      <span className="material-icons-outlined text-yellow-400 !text-7xl m-2">
                        sentiment_neutral
                      </span>
                      <span>No Winner!</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onPlayAgain}
                  className="flex w-full justify-center rounded-md border py-3 px-4 mt-2 text-lg font-medium text-gray-900 bg-green-500 border-gray-900 hover:shadow-lg focus:outline-none focus:ring-0 focus:ring-gray-500 focus:ring-offset-1">
                  Play Again
                </button>
              </>
            )}
            {!endGameMessage && (
              <>
                <div className="flex flex-col justify-center items-start p-4 gap-4 rounded-xl bg-gray-700 border-opacity-70">
                  {[symbolX, symbolO].map((symbol) => (
                    <div
                      key={symbol.name}
                      className="flex flex-row justify-center">
                      <span
                        className={`material-icons-outlined ${symbol.className} !text-4xl`}>
                        {symbol.iconName}
                      </span>
                      <div className="text-2xl text-gray-200 font-medium">
                        <span className="ml-2"> =</span>
                        <span className="ml-3">
                          {
                            squares.filter(
                              (e) => e.player?.symbol.name === symbol.name
                            ).length
                          }
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row justify-center items-start p-4 rounded-xl bg-gray-700 border-opacity-70">
                  <div className="text-2xl text-gray-200 font-medium mr-3">
                    Player:
                  </div>
                  <span
                    hidden={!currentPlayer}
                    className={`material-icons-outlined ${currentPlayer.symbol.className} !text-3xl`}>
                    {currentPlayer.symbol.iconName}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
