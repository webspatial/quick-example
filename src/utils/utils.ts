export type CategoryId = 'all' | 'nature' | 'city' | 'people' | 'abstract'

export type Category = {
  id: CategoryId
  label: string
}

export type Tile = {
  id: string
  height: number
  color: string
  label: string
}

export const categories: Category[] = [
  { id: 'all', label: '推荐' },
  { id: 'nature', label: '自然' },
  { id: 'city', label: '城市' },
  { id: 'people', label: '人物' },
  { id: 'abstract', label: '抽象' },
]

const palettes: Record<CategoryId, string[]> = {
  all: ['#8b5cf6', '#22c55e', '#06b6d4', '#f97316', '#ef4444', '#eab308'],
  nature: ['#16a34a', '#22c55e', '#10b981', '#84cc16', '#0ea5e9'],
  city: ['#0f172a', '#334155', '#475569', '#64748b', '#111827'],
  people: ['#fb7185', '#f472b6', '#a78bfa', '#60a5fa', '#34d399'],
  abstract: ['#f43f5e', '#a855f7', '#3b82f6', '#14b8a6', '#f59e0b'],
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 2 ** 32
  }
}

function hashStringToSeed(input: string) {
  let hash = 2166136261
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function generateTiles(category: Category, count: number): Tile[] {
  const rand = createSeededRandom(hashStringToSeed(category.id))
  const palette = palettes[category.id]

  return Array.from({ length: count }, (_, index) => {
    const height = Math.round(120 + rand() * 180)
    const color = palette[Math.floor(rand() * palette.length)]

    return {
      id: `${category.id}-${index + 1}`,
      height,
      color,
      label: `${category.label} ${index + 1}`,
    }
  })
}

export function toMasonryColumns(tiles: Tile[], columnCount: number) {
  const columns: Tile[][] = Array.from({ length: columnCount }, () => [])
  const columnHeights = Array.from({ length: columnCount }, () => 0)

  for (const tile of tiles) {
    let minIndex = 0
    for (let i = 1; i < columnHeights.length; i++) {
      if (columnHeights[i] < columnHeights[minIndex]) minIndex = i
    }

    columns[minIndex].push(tile)
    columnHeights[minIndex] += tile.height
  }

  return columns
}

export function getColumnCountForViewport(width: number) {
  if (width < 720) return 1
  if (width < 1024) return 2
  return 3
}