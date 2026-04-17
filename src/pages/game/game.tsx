import { useCallback, useMemo, useRef, useState } from 'react'
import BlockField from './component/BlockField'
import './game.css'

const GAME_SECONDS = 60

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function Game() {
  const [status, setStatus] = useState<'idle' | 'running' | 'ended'>('idle')
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS)
  const [score, setScore] = useState(0)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const hudRef = useRef<HTMLDivElement | null>(null)

  const isRunning = status === 'running'

  const topInset = useMemo(() => {
    const hudHeight = hudRef.current?.getBoundingClientRect().height ?? 0
    return clamp(Math.ceil(hudHeight), 0, 240)
  }, [status])

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(GAME_SECONDS)
    setStatus('running')
  }, [])

  const stopGame = useCallback(() => {
    setScore(0)
    setTimeLeft(GAME_SECONDS)
    setStatus('idle')
  }, [])

  const endGame = useCallback(() => {
    setStatus('ended')
  }, [])

  return (
    <div
      ref={rootRef}
      className="gameRoot"
    >
      <div ref={hudRef} className="gameHud">
        <div className="gameHudLeft">
          <div className="gameStats">
            <div className="gameStat">Time: {timeLeft}s</div>
            <div className="gameStat">Score: {score}</div>
          </div>
        </div>

        <div className="gameHudRight">
          {status === 'running' ? (
            <button type="button" className="gameButton" onClick={stopGame}>
              Stop
            </button>
          ) : (
            <button
              type="button"
              className="gameButton isPrimary"
              onClick={startGame}
            >
              Start
            </button>
          )}
        </div>
      </div>

      {status === 'running' ? (
        <BlockField
          isRunning={isRunning}
          durationSeconds={GAME_SECONDS}
          blockCount={3}
          topInset={topInset}
          onScoreChange={setScore}
          onTimeChange={setTimeLeft}
          onFinish={endGame}
        />
      ) : null}

      {status !== 'running' ? (
        <div className="gameCenter">
          <div className="gameCenterCard">
            <div className="gameCenterTitle">
              {status === 'idle' ? 'Ready?' : 'Game Over'}
            </div>
            <div className="gameCenterSub">点击 Start 开始 60 秒挑战</div>
            <div className="gameRules">
              <div className="gameRule">规则：绿色 +3 分，红色 -1 分</div>
              <div className="gameRule">方块每秒随机一次，点击任意方块会立刻随机</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Game