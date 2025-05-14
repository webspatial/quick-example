


const Card = ({
                children,
                headerClassName,
                headerStyle,
                headerProps,
              }) => {
  return (
    <div className="card">
      <div
        className={`card-header ${headerClassName ||''}`}
        style={headerStyle}
        {...headerProps}
        >
        Card Title
    </div>
  <div className="card-body">{children}</div>
</div>
) };

export default Card;
