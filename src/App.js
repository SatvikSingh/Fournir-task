// importing required components and packages
import "./App.css";
import { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import EditableRow from "./Components/EditableRow";
import Row from "./Components/Row";
import { CSVLink } from "react-csv";

// Creating an array of objects to save the table data
const test_data = [
  {
    personLocation: "orig",
    matchCount: "671/1000",
    timeTaken: "438.5",
    milesTravelled: "54",
    fuelUsed: "545",
    numberVehicles: "3",
  },
];

function App() {
  // State to save data inside the array of objects created above to be rendered inside the table
  const [data, setData] = useState(test_data);

  // State to save data to be added in the array of objects to then be pushed inside the table
  const [addFormData, setAddFormData] = useState({
    personLocation: "",
    matchCount: "",
    timeTaken: "",
    milesTravelled: "",
    fuelUsed: "",
    numberVehicles: "",
  });

  // State to save data that is being changed when edit button is clicked
  const [editFormData, setEditFormData] = useState({
    personLocation: "",
    matchCount: "",
    timeTaken: "",
    milesTravelled: "",
    fuelUsed: "",
    numberVehicles: "",
  });

  // State to handle the ID of every row
  const [ID, setID] = useState(null);

  // This event will be triggered when there is new data to be added inside the table through the form for adding data
  const changeData = (event) => {
    // It will capture the name attribute of the input field
    const field = event.target.name;
    // It will capture the value that is assigned to the input field
    const value = event.target.value;

    // Creating a new object for storing the values of initial state
    const newFormData = {
      ...addFormData,
    };

    // Mapping the initial state with corresponding field name to its value
    newFormData[field] = value;
    // Setting the final state as the changed object
    setAddFormData(newFormData);
  };

  // This will be triggered as soon as the Add Data button is clicked
  const addData = (event) => {
    event.preventDefault();
    // Assign a random uniquely generated ID to the data
    addFormData.id = nanoid();
    // Creating a new array of to hold the initial state of the table data
    const newData = [...data, addFormData];
    // Setting the table data to the new array
    setData(newData);
    // Resetting the initial state of the form to prevent redundant IDs
    setAddFormData({
      personLocation: "",
      matchCount: "",
      timeTaken: "",
      milesTravelled: "",
      fuelUsed: "",
      numberVehicles: "",
    });
  };

  // This will be triggered when Edit is clicked on any row
  const clickEdit = (event, rowData) => {
    event.preventDefault();
    // We save the row's ID to the state
    setID(rowData.id);
    // Create a new const to save everything in the row
    const newdata = rowData;
    // Setting the edit Form data to the row data
    setEditFormData(newdata);
  };

  // This will be triggered whenever there is a change in the edit form fields inside the editable row
  const changeEditData = (event) => {
    event.preventDefault();
    // capturing name attribute of the field
    const fieldname = event.target.name;
    // capturing the value assigned to the field
    const value = event.target.value;
    // creating a temporary object to hold the initial data inside the edit form
    const temp = { ...editFormData };
    // assigning the changed data by mapping field name to value
    temp[fieldname] = value;
    // Setting the final state as the changed data object
    setEditFormData(temp);
  };

  // This will be triggered when Delete button is pressed on a row
  const deleteData = (id) => {
    // Create a new array to hold the table's current data
    const newData = [...data];
    // Find the index where the delete button is pressed using the row's ID
    const i = newData.findIndex((obj) => obj.id === id);
    // Splice the array to delete the index where delete button was pressed
    newData.splice(i, 1);
    // Setting the new spliced array to the final state of the table data
    setData(newData);
  };

  // This will be called when the save button is pressed on the edited data
  const saveData = (event) => {
    event.preventDefault();
    // Create a new object to hold the initial state of the edit form data
    const formData = { ...editFormData };
    // Create new array to hold the initial state of the table data
    const temp = [...data];
    // Find index where the save button was pressed
    const i = temp.findIndex((obj) => obj.id === ID);
    // Mapping the new array of table data and assigning the edit form data state to the index where save button was pressed
    temp[i] = formData;
    // Setting the final state of table data as the new array
    setData(temp);
    // Resetting the row's ID
    setID(null);
  };

  // This will be triggered when cancel button is pressed and the user wants to close the editing form without saving
  const cancel = () => {
    // Set row ID to null to exit editable row format
    setID(null);
  };

  return (
    <div className="App">
      {/* Creating form for the table to contain all the data and buttons */}
      <form onSubmit={saveData}>
        {/* Creating table */}
        <table>
          {/* Table headings */}
          <thead>
            <tr>
              <th>Person_Location</th>
              <th>Match_Count</th>
              <th>Time_Taken(s)</th>
              <th>Miles_Travelled</th>
              <th>Fuel_Used</th>
              <th>Number_Vehicles</th>
              <th>Actions</th>
            </tr>
          </thead>

          {/* Table Data */}
          <tbody>
            {/* Traversing trough the data array to set each single one as row data and render it inside the table */}
            {data.map((rowData) => (
              <Fragment>
                {/* If there is an ID then set the current row to editable format, else set it to a read only row */}
                {ID === rowData.id ? (
                  // Initializing the editable row and passing the required functions
                  <EditableRow
                    editFormData={editFormData}
                    cancel={cancel}
                    changeEditData={changeEditData}
                  />
                ) : (
                  // Initializing the read only row and passing required functions
                  <Row
                    rowData={rowData}
                    deleteData={deleteData}
                    clickEdit={clickEdit}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      {/* This form is for adding new data to the table */}
      <div className="addDataForm">
        <form onSubmit={addData}>
          {/* Person Location */}
          <div className="input-field">
            <label>Person_Location</label>
            <input
              type="text"
              name="personLocation"
              value={addFormData.personLocation}
              onChange={changeData}
            ></input>
          </div>

          {/* Match Count */}
          <div className="input-field">
            <label>Match_Count</label>
            <input
              type="text"
              name="matchCount"
              value={addFormData.matchCount}
              onChange={changeData}
            ></input>
          </div>

          {/* Time Taken */}
          <div className="input-field">
            <label>Time_Taken</label>
            <input
              type="text"
              name="timeTaken"
              value={addFormData.timeTaken}
              onChange={changeData}
            ></input>
          </div>

          {/* Miles Travelled */}
          <div className="input-field">
            <label>Miles_Travelled</label>
            <input
              type="text"
              name="milesTravelled"
              value={addFormData.milesTravelled}
              onChange={changeData}
            ></input>
          </div>

          {/* Fuel Used */}
          <div className="input-field">
            <label>Fuel_Used</label>
            <input
              type="text"
              name="fuelUsed"
              value={addFormData.fuelUsed}
              onChange={changeData}
            ></input>
          </div>

          {/* Number Vehicles */}
          <div className="input-field">
            <label>Number_Vehicles</label>
            <input
              type="text"
              name="numberVehicles"
              value={addFormData.numberVehicles}
              onChange={changeData}
            ></input>
          </div>
        </form>
        {/* Add Data buttom */}
        <center>
          <button
            className="add-data-button btn"
            type="submit"
            onClick={addData}
          >
            Add Data
          </button>
        </center>
      </div>
      {/* Link to generate CSV */}
      <CSVLink className="download-csv-button" data={data}>
        <span>Download</span><span>CSV</span>
      </CSVLink>
    </div>
  );
}

export default App;
