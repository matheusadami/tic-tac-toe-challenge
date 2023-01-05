import { useState } from 'react'
import {
  Symbol,
  Player,
  GameSquare,
  EndGameType,
  EndGameMessage
} from '@/utils/types'
import { Squares } from '@/components/Squares/index'
import { EndGameInfo } from '@/components/EndGameInfo/index'
import { GameInfo } from '@/components/GameInfo/index'

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

const winningCombinations: number[][] = [
  // Diagonals
  [1, 5, 9],
  [3, 5, 7],

  // Horizontals
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],

  // Verticals
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
]

const initialGameSquares: GameSquare[] = [
  {
    position: 1,
    className: 'border-b-4 border-gray-400 border-opacity-70'
  },
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
      for (const combination of winningCombinations) {
        let codes = getCodePlayersByPositions(combination)
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
        <Squares
          onPlay={onPlay}
          squares={squares}
          disabled={!!endGameMessage}
        />
        <div className="h-full">
          {endGameMessage && (
            <EndGameInfo
              endGameMessage={endGameMessage}
              onPlayAgain={onPlayAgain}
            />
          )}
          {!endGameMessage && (
            <GameInfo
              symbols={[symbolX, symbolO]}
              squares={squares}
              currentPlayer={currentPlayer}
            />
          )}
        </div>
      </div>
    </div>
  )
}
