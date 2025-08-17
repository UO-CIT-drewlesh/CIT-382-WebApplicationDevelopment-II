import "./styles.css";
import { useState } from "react";

export default function App() {
  /**** Initiate useState variables using object desconstruction for user inputs ****/
  const [count, setCount] = useState(1);
  const [inputFirst, setInputFirst] = useState("");
  const [inputMiddle, setInputMiddle] = useState("");
  const [inputLast, setInputLast] = useState("");
  const [inputID, setInputID] = useState("");
  const [inputBox, setInputBox] = useState(false);
  const [data, setdata] = useState([]);

  /**** Initiate state variables for required fields error handling. ****/
  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [idError, setIdError] = useState("");

  /**** Handle user inputs using useState. ****/
  const eventHandlerFirst = (event) => {
    /* required fields(first, last, ID) are indicated on display using conditional ternary operators and state variables. Span tags are used to wrap text to input elements */
    const value = event.target.value.replace(" ", "");
    setInputFirst(value);
    setFirstError(value === "" ? "First name required" : "");
  };

  const eventHandlerMiddle = (event) => {
    setInputMiddle(event.target.value.replace(" ", ""));
  };

  const eventHandlerLast = (event) => {
    const value = event.target.value.replace(" ", "");
    setInputLast(value);
    setLastError(value === "" ? "Last name required" : "");
  };

  const eventHandlerID = (event) => {
    const value = event.target.value.replace(" ", "");
    setInputID(value);
    setIdError(value === "" ? "ID required" : "");
  };

  const eventHandlerBox = (event) => {
    setInputBox(event.target.checked);
  };

  const eventHandlerButton = () => {
    /* create new data object if an ID, first name, and last name are provided. */
    if (inputID !== "" && inputLast !== "" && inputFirst !== "") {
      /* Boolean used for conditional rendering. */
      let uniqueId = true;

      /* 
        - Loop through the data array to compare a new ID to previous IDs stored.
        - If an ID matches, 
          1. switch uniqueID to 'false' so no data will be saved as data objects, 
          2. alert the user with a popup message
          3. reset the input ID given by the user 
      */
      for (i in data) {
        if (data[i].id === inputID) {
          uniqueId = false;
          setInputID("");
          break;
        }
      }

      /* If input has a unique ID, create a new data object */
      if (uniqueId === true) {
        const dataObject = {
          counter: count,
          first: inputFirst,
          middle: inputMiddle,
          last: inputLast,
          id: inputID,
          residentOr: inputBox
        };

        /* send data object to the data array. */
        setdata([...data, dataObject]);
        /* set input elements back to default. */
        setInputFirst("");
        setInputMiddle("");
        setInputLast("");
        setInputID("");
        setInputBox(false);
        setCount(count + 1);
      }
    } else {
      /* If there is an input error, direct errors to display. */
      setIdError(inputID === "" ? "ID required" : "");
      setLastError(inputLast === "" ? "Last name required" : "");
      setFirstError(inputFirst === "" ? "First name required" : "");
    }
  };

  /* this function is called within JSX return statement, displays inputted data on the page. */
  const displayData = () => {
    /* if there is no data in the array, document that on the page. */
    if (data.length === 0) {
      return (
        <div className="displayNoData">
          No students in data, add a student to display.
        </div>
      );
    } else {
      return (
        <div className="displayData">
          {data.map((dataObject, index) => (
            <div key={index} className="studentInfo">
              <div className="studentCount">{dataObject.counter}. </div>
              <div className="studentContent">
                {dataObject.id}: {dataObject.last}, {dataObject.first},{" "}
                {dataObject.middle && `${dataObject.middle}, `}
                {String(dataObject.residentOr)}
              </div>
              {/* Boolean values must be displayed as strings. */}
              {/* A middle name is optional, so it is displayed with condition to it existing. */}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="App">
      <div className="title">Student Information</div>
      {/* 
        *** The 'eventHandler...' callback functions are used within input tags, checking for changes or clicks *** 
          htmlFor: connects a label to the input tag using the id of the input tag
          value: allows the value of the user input to be updated into a data object, using the state variables that were created
      */}
      <label htmlFor="fName">First:</label>
      <input
        required
        id="fName"
        value={inputFirst}
        onChange={eventHandlerFirst}
      />
      <span className="error">{firstError}</span>
      <br />

      <label htmlFor="mName">Middle:</label>
      <input id="mName" value={inputMiddle} onChange={eventHandlerMiddle} />
      <span className="error"></span>
      <br />

      <label htmlFor="lName">Last:</label>
      <input
        required
        id="lName"
        value={inputLast}
        onChange={eventHandlerLast}
      />
      <span className="error">{lastError}</span>
      <br />

      <label htmlFor="id">ID:</label>
      <input required id="id" value={inputID} onChange={eventHandlerID} />
      <span className="error">{idError}</span>
      <br />

      <label htmlFor="residentOr">Oregon Resident:</label>
      <input
        type="checkbox"
        id="residentOr"
        className="checkbox"
        checked={inputBox}
        onChange={eventHandlerBox}
      />
      <br />

      <button
        type="button"
        id="addStudent"
        className="submit"
        value={data}
        onClick={eventHandlerButton}
      >
        Add Student
      </button>
      <hr />

      <div className="studentInfoTitle">Students</div>
      <div className="studentInfoKey">
        ID: Last name, First name, (Middle name), Oregon residency
      </div>
      <hr />
      <div>{displayData()}</div>
    </div>
  );
}
