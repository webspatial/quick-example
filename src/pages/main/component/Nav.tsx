import './Nav.css'

type NavItem<T extends string> = {
  id: T
  label: string
}

type NavProps<T extends string> = {
  title: string
  subtitle?: string
  items: NavItem<T>[]
  activeId: T
  onChange: (id: T) => void
}

function Nav<T extends string>({
  title,
  subtitle,
  items,
  activeId,
  onChange,
}: NavProps<T>) {
  function openGame() {
    window.open('/game', '_blank')
  }
  return (
    <aside className="sidebar">
      <div className="sidebarHeader">
        <h2 className="sidebarTitle">{title}</h2>
        {subtitle ? <div className="sidebarSub">{subtitle}</div> : null}
      </div>

      <nav className="nav">
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              className={`navItem${isActive ? ' isActive' : ''}`}
              onClick={() => onChange(item.id)}
            >
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="sidebarFooter">
        <button
          type="button"
          className="footerButton"
          onClick={openGame}
        >
          打开 Game
        </button>
      </div>
    </aside>
  )
}

export default Nav