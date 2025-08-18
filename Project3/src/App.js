import "./styles.css";
import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { v4 as uuidv4 } from "uuid";

// Component RandomNumbers contains 3 child components: Description, Data, Statistics
function RandomNumbers() {
  const [data, setData] = useState([]);

  /*
    Button handler for "Generate Number"
      -Sets new random number into the data, using max as 100 and min as 1(inclusive)
  */
  const handleGenerateNumber = (e) => {
    const max = 100;
    const min = 1;
    //https://www.sitepoint.com/generate-random-numbers-javascript/#:~:text=You%20can%20use%20the%20formula,)%20and%20max%20(inclusive).
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

    // deep clone object, sort the object by num and set the randomNumbers for display
    const clonedNumbers = cloneDeep([
      ...data,
      { uuid: uuidv4(), num: randomInt }
    ]);

    //https://www.w3schools.com/js/js_array_sort.asp
    clonedNumbers.sort((a, b) => a.num - b.num);
    setData(clonedNumbers);
  };

  // Clear Numbers button handler
  const handleClearNumbers = () => {
    setData([]);
  };

  // Component to display program description
  function Description() {
    return (
      <div className="description">
        <h3>Description:</h3>
        Generate random number between 1 and 100 (inclusive) <br />
        Display sorted list of generated random numbers <br />
        Display statistical information about numbers <br />
        Clear numbers. <br />
      </div>
    );
  }

  // Component --> computes stastics: count, avg, min, max, median
  function Statistics() {
    let count = data.length;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    let sum = data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.num,
      0
    );
    let avg = count === 0 ? 0 : Math.round(sum / count);

    let min =
      count === 0
        ? 0
        : data.reduce((accumulator, currentValue) => {
            return currentValue.num < accumulator
              ? currentValue.num
              : accumulator;
          }, data[0].num);

    let max =
      count === 0
        ? 0
        : data.reduce((accumulator, currentValue) => {
            return currentValue.num > accumulator
              ? currentValue.num
              : accumulator;
          }, 0);

    // https://blog.stackademic.com/finding-the-median-of-an-array-in-javascript-82ff31b3f544
    let median = 0;
    let middleIndex = Math.floor(count / 2);

    if (count % 2 !== 0) {
      median = data[middleIndex].num;
    } else {
      median =
        count === 0
          ? 0
          : (data[middleIndex].num + data[middleIndex - 1].num) / 2;
    }

    return (
      <div>
        <h3>Statistics</h3>
        Count: {count}, Average: {avg}, Minimum: {min}, Maximum: {max}, Median:{" "}
        {median}
      </div>
    );
  }

  function Data() {
    return (
      <div>
        <h3>Data</h3>
        {data.map(({ uuid, num }) => (
          <div key={uuid}>{num}</div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Description />
      <br />
      <button onClick={handleGenerateNumber}>Generate Number</button>
      <button onClick={handleClearNumbers}>Clear Numbers</button>
      <hr />
      <Statistics />
      <hr />
      <Data />
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>CIT 382 - 24W</h1>
      <h2>Project 4</h2>
      <RandomNumbers />
    </div>
  );
}
