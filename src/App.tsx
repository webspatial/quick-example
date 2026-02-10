import "./App.css";
import { useState } from "react";
import MaterialApiTest from "./MaterialApiTest";
import SecondPage from "./SecondPage";

function App() {
  const [page, setPage] = useState<"home" | "second">("home");
  return (
<<<<<<< Updated upstream
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/second-page" element={<SecondPage />} />
        <Route
          path="/"
          element={
            <>
              <div>
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img
                    src={reactLogo}
                    className="logo react"
                    alt="React logo"
                  />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card count-card" enable-xr>
                <button onClick={() => setCount(count => count + 1)}>
                  count is {count}
                </button>
                <p enable-xr>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
              <div className="card link-card" enable-xr>
                <h2>Open Second Page</h2>
                <p>
                  <Link to="/second-page" target="_blank" enable-xr>
                    Open Second Page with a Link
                  </Link>
                </p>
                <p>
                  <button
                    onClick={() => {
                      initScene("secondScene", prevConfig => {
                        return {
                          ...prevConfig,
                          defaultSize: {
                            width: 500,
                            height: 500,
                          },
                        };
                      });
                      window.open(
                        `${__XR_ENV_BASE__}/second-page`,
                        "secondScene",
                      );
                    }}>
                    Open Second Page with a Button
                  </button>
                </p>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
=======
    <div>
      <nav style={{ marginBottom: 16 }}>
        <button onClick={() => setPage("home")}>Home</button>
        <span style={{ margin: "0 8px" }}>/</span>
        <button aria-label="go-to-second" onClick={() => setPage("second")}>
          Go to Second
        </button>
      </nav>
      {page === "home" ? <MaterialApiTest /> : <SecondPage />}
    </div>
>>>>>>> Stashed changes
  );
}

export default App;
