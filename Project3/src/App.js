// Import the ShowJupiterMoons component
import ShowJupiterMoons from "./ShowJupiterMoons";
// Import the JupiterMoonData
import JupiterMoonData from "./data/JupiterMoonData";
// Import the styles.css stylesheet
import "./styles.css";

// *** App Function ***
// Display "CIT 382 - 22W"
// Display "Project 3"
// Display "Four Moons of Jupiter"
// Include the ShowJupiterMoons component, and include the JupiterMoonData as the value for the component moons property
export default function App() {
  return (
    <div className="App">
      <h1>CIT 382 - 24W</h1>
      <h2>Project 3</h2>
      <h3>Four Moons of Jupiter</h3>
      <ShowJupiterMoons moons={JupiterMoonData} />
    </div>
  );
}
