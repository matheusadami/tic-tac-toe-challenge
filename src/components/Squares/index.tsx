import { GameSquare } from '@/utils/types'

interface Props {
  squares: GameSquare[]
  disabled: boolean
  onPlay: (square: GameSquare, index: number) => void
}

export function Squares({ squares, disabled, onPlay }: Props) {
  return (
    <div
      className={`grid grid-cols-3 grid-rows-3 ${
        disabled ? 'pointer-events-none' : ''
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
  )
}
