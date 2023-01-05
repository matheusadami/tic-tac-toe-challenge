import { EndGameMessage, EndGameType } from '@/utils/types'

interface Props {
  endGameMessage: EndGameMessage
  onPlayAgain: () => void
}

export function EndGameInfo({ endGameMessage, onPlayAgain }: Props) {
  return (
    <div className="flex flex-col justify-evenly items-center h-full">
      <div className="flex flex-col justify-center items-center p-4 gap-4 rounded-xl bg-gray-700 border-opacity-70">
        <div className="flex flex-col items-center text-2xl text-gray-200 font-medium px-8">
          {endGameMessage.type === EndGameType.hasWinner && (
            <span
              className={`material-icons-outlined ${endGameMessage.winner?.symbol.className} !text-7xl m-2`}>
              {endGameMessage.winner?.symbol.iconName}
            </span>
          )}
          {endGameMessage.type === EndGameType.tiedGame && (
            <span className="material-icons-outlined text-yellow-400 !text-7xl m-2">
              sentiment_neutral
            </span>
          )}

          {endGameMessage.type === EndGameType.hasWinner && (
            <span>Winner!</span>
          )}
          {endGameMessage.type === EndGameType.tiedGame && (
            <span>No Winner!</span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onPlayAgain}
        className="flex w-full justify-center rounded-md border py-3 px-4 mt-2 text-lg font-medium text-gray-900 bg-green-500 border-gray-900 hover:shadow-lg focus:outline-none focus:ring-0 focus:ring-gray-500 focus:ring-offset-1">
        Play Again
      </button>
    </div>
  )
}
