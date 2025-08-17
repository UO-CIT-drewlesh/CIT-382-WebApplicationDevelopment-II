import "./styles.css";
import Sample from "./Sample";
import { textData, makeLowercase, makeUppercase } from "./misc";

export default function App() {
  return (
    <div>
      <h1>Lab 3</h1>
      <Sample description={makeLowercase(textData[0])} />
      <Sample description={makeUppercase(textData[1])} />
      <Sample description={makeLowercase(textData[2])} />
    </div>
  );
}
