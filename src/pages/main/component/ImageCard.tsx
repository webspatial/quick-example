import type { CSSProperties } from 'react'
import type { Tile } from '../../../utils/utils'
import './ImageCard.css'

type ImageCardProps = {
  tile: Tile
  liked: boolean
  onToggleLike: (tileId: string) => void
}

function ImageCard({ tile, liked, onToggleLike }: ImageCardProps) {
  const tileStyle = {
    height: tile.height,
    backgroundColor: tile.color,
  } as CSSProperties

  return (
    <div className="tile" style={tileStyle}>
      <div className="tileOverlay" />
      <div className="tileLabel">
        <span className="tileName">{tile.label}</span>
        <button
          type="button"
          className={`likeButton${liked ? ' isLiked' : ''}`}
          style={{
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
          }}
          onClick={(e) => {
            e.stopPropagation()
            onToggleLike(tile.id)
          }}
        >
          <span style={{display: liked ? 'block' : 'none'}}>♥</span>
          <span style={{display: liked ? 'none' : 'block'}}>♡</span>
        </button>
      </div>
    </div>
  )
}

export default ImageCard