import { useEffect, useMemo, useState } from 'react'
import ImageCard from './component/ImageCard'
import Nav from './component/Nav'
import {
  categories,
  generateTiles,
  getColumnCountForViewport,
  toMasonryColumns,
  type CategoryId,
} from '../../utils/utils'
import './App.css'

function getInitialColumnCount() {
  if (typeof window === 'undefined') return 3
  return getColumnCountForViewport(window.innerWidth)
}

function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all')
  const [columnCount, setColumnCount] = useState(() => getInitialColumnCount())
  const [liked, setLiked] = useState<Record<string, boolean>>({})

  const toggleLike = (tileId: string) => {
    setLiked((prev) => ({
      ...prev,
      [tileId]: !prev[tileId],
    }))
  }

  useEffect(() => {
    const onResize = () => setColumnCount(getColumnCountForViewport(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const tiles = useMemo(() => {
    const selected = categories.find((c) => c.id === activeCategory) ?? categories[0]
    return generateTiles(selected, 36)
  }, [activeCategory])

  const columns = useMemo(
    () => toMasonryColumns(tiles, Math.max(1, columnCount)),
    [tiles, columnCount],
  )

  const activeLabel =
    categories.find((c) => c.id === activeCategory)?.label ?? '推荐'

  return (
    <>
      <Nav
        title="类型"
        subtitle="切换分类查看不同内容"
        items={categories}
        activeId={activeCategory}
        onChange={(id) => setActiveCategory(id)}
      />

      <main className="content">
        <section className="masonry" aria-label={`${activeLabel} 瀑布流`}>
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="column">
              {column.map((tile) => (
                <ImageCard
                  key={tile.id}
                  tile={tile}
                  liked={Boolean(liked[tile.id])}
                  onToggleLike={toggleLike}
                />
              ))}
            </div>
          ))}
        </section>
      </main>
    </>
  )
}

export default App
