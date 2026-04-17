export type BlockKind = 'good' | 'bad'

export type Block = {
  id: string
  kind: BlockKind
  x: number
  y: number
  size: number
}

type GenerateBlocksOptions = {
  margin?: number
  baseSize?: number
  minSize?: number
  maxSize?: number
  maxAttempts?: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function overlaps(a: Block, b: Block) {
  return !(
    a.x + a.size <= b.x ||
    b.x + b.size <= a.x ||
    a.y + a.size <= b.y ||
    b.y + b.size <= a.y
  )
}

export function generateBlocks(
  viewportWidth: number,
  viewportHeight: number,
  topInset: number,
  blockCount: number,
  options: GenerateBlocksOptions = {},
): Block[] {
  const margin = options.margin ?? 18
  const baseSize = options.baseSize ?? 96
  const minSize = options.minSize ?? 44
  const maxSize = options.maxSize ?? 140
  const maxAttempts = options.maxAttempts ?? 40

  const usableWidth = Math.max(0, viewportWidth - margin * 2)
  const usableHeight = Math.max(0, viewportHeight - margin * 2 - topInset)
  const size = clamp(baseSize, minSize, Math.min(maxSize, usableWidth, usableHeight))

  const minX = margin
  const maxX = Math.max(minX, viewportWidth - margin - size)

  const minY = margin + topInset
  const maxY = Math.max(minY, viewportHeight - margin - size)

  const result: Block[] = []
  const total = Math.max(0, Math.floor(blockCount))
  const goodCount = total > 0 ? 1 : 0
  const kinds: BlockKind[] = [
    ...Array.from({ length: total - goodCount }, () => 'bad' as BlockKind),
    ...Array.from({ length: goodCount }, () => 'good' as BlockKind),
  ]

  for (let i = 0; i < kinds.length; i++) {
    const kind = kinds[i]

    const candidateBase: Block = {
      id: `${kind}-${i}`,
      kind,
      x: minX,
      y: minY,
      size,
    }

    let placed = false
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const candidate: Block = {
        ...candidateBase,
        x: randomInt(minX, maxX),
        y: randomInt(minY, maxY),
      }

      if (!result.some((b) => overlaps(b, candidate))) {
        result.push(candidate)
        placed = true
        break
      }
    }

    if (!placed) {
      result.push({
        ...candidateBase,
        x: randomInt(minX, maxX),
        y: randomInt(minY, maxY),
      })
    }
  }

  return result
}