import "./App.css";
import SaveSegment from "./Components/SaveSegment";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Segments</h1>
      </header>
      <main className="segment-section">
        <SaveSegment />
      </main>
    </div>
  );
}

export default App;
