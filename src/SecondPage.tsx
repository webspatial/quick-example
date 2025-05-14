import { useState } from "react";
import "./App.css";
import Card from "./card.tsx";

function SecondPage() {
  const [count, setCount] = useState(0);

  const Buttonv = ({ children, className, style, ...rest}) => {
    return (
      <button
        className={`default-button ${className || ''}`}
        style={{backgroundColor: 'blue', color: 'white', ...style}}
        {...rest}>
        {children}
      </button>
    );
  }

  return (
    <div className="App">
      <style>
        {`
          h1 {
          --xr-background-material: translucent;
          --xr-back: 500;
        }
      `}
      </style>
      <h1 enable-xr>Second Page</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <Buttonv
          className="custom-btn __enableXr__"
          style={{fontSize: '14px', enableXr: true}}
          data-testid="submit-btn"
          enalbe-xr
        >
          submit
        </Buttonv>
        <Card
          headerClassName="custom-header __enableXr__"
          headerStyle={{backgroundColor: 'gray', enableXr: true}}
          headerProps={{'aria-label': 'Card Title', 'enable-xr': true}}
        >
          Card Content
        </Card>
      </div>
    </div>
  );
}

export default SecondPage;
