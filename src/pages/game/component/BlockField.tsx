import { useCallback, useEffect, useRef, useState } from 'react'
import { generateBlocks, type Block } from './blocks'

type BlockFieldProps = {
  isRunning: boolean
  durationSeconds: number
  blockCount: number
  topInset: number
  onScoreChange: (score: number) => void
  onTimeChange: (timeLeft: number) => void
  onFinish: () => void
}

const MOVE_INTERVAL_MS = 1000

function BlockField({
  isRunning,
  durationSeconds,
  blockCount,
  topInset,
  onScoreChange,
  onTimeChange,
  onFinish,
}: BlockFieldProps) {
  const [blocks, setBlocks] = useState<Block[]>([])
  const boardRef = useRef<HTMLDivElement | null>(null)
  const moveTimeoutIdRef = useRef<number | null>(null)
  const tickIntervalIdRef = useRef<number | null>(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(durationSeconds)

  const clearMoveTimer = useCallback(() => {
    if (moveTimeoutIdRef.current != null) {
      window.clearTimeout(moveTimeoutIdRef.current)
      moveTimeoutIdRef.current = null
    }
  }, [])

  const clearTickTimer = useCallback(() => {
    if (tickIntervalIdRef.current != null) {
      window.clearInterval(tickIntervalIdRef.current)
      tickIntervalIdRef.current = null
    }
  }, [])

  const reshuffle = useCallback(() => {
    const rect = boardRef.current?.getBoundingClientRect()
    const width = rect?.width || window.innerWidth
    const height = rect?.height || window.innerHeight
    setBlocks(generateBlocks(width, height, topInset, blockCount))
  }, [blockCount, topInset])

  const scheduleNextMove = useCallback(() => {
    clearMoveTimer()

    moveTimeoutIdRef.current = window.setTimeout(() => {
      reshuffle()
      scheduleNextMove()
    }, MOVE_INTERVAL_MS)
  }, [clearMoveTimer, reshuffle])

  const handleHit = useCallback(
    (block: Block) => {
      if (!isRunning) return

      scoreRef.current += block.kind === 'good' ? 3 : -1
      onScoreChange(scoreRef.current)
      reshuffle()
      scheduleNextMove()
    },
    [isRunning, onScoreChange, reshuffle, scheduleNextMove],
  )

  useEffect(() => {
    if (!isRunning) {
      clearMoveTimer()
      clearTickTimer()
      setBlocks([])
      return
    }

    scoreRef.current = 0
    timeRef.current = durationSeconds
    onScoreChange(0)
    onTimeChange(durationSeconds)

    reshuffle()
    scheduleNextMove()

    clearTickTimer()
    tickIntervalIdRef.current = window.setInterval(() => {
      timeRef.current = Math.max(0, timeRef.current - 1)
      onTimeChange(timeRef.current)
      if (timeRef.current === 0) {
        clearMoveTimer()
        clearTickTimer()
        onFinish()
      }
    }, 1000)

    return () => {
      clearMoveTimer()
      clearTickTimer()
    }
  }, [
    clearMoveTimer,
    clearTickTimer,
    durationSeconds,
    isRunning,
    onFinish,
    onScoreChange,
    onTimeChange,
    reshuffle,
    scheduleNextMove,
  ])

  return (
    <div ref={boardRef} className="gameBoard" aria-label="reaction game">
      {blocks.map((block) => (
        <button
          key={block.id}
          type="button"
          className={`gameBlock ${block.kind}`}
          style={{
            width: block.size,
            height: block.size,
            transform: `translate(${block.x}px, ${block.y}px)`,
          }}
          onClick={() => handleHit(block)}
        />
      ))}
    </div>
  )
}

export default BlockField