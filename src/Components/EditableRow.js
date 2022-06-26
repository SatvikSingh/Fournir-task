import React from "react";
import '../App.css'

// Passing required functions inside the component
const EditableRow = ({ editFormData, cancel, changeEditData }) => {
  return (
    <tr>
      <td>
        {/* Person Location field */}
        <input
          type="text"
          name="personLocation"
          value={editFormData.personLocation}
          onChange={changeEditData}
        ></input>
      </td>
      <td>
        {/* Match Count field */}
        <input
          type="text"
          name="matchCount"
          value={editFormData.matchCount}
          onChange={changeEditData}
        ></input>
      </td>
      <td>
        {/* Time Taken field */}
        <input
          type="text"
          name="timeTaken"
          value={editFormData.timeTaken}
          onChange={changeEditData}
        ></input>
      </td>
      <td>
        {/* Miles Travelled field */}
        <input
          type="text"
          name="milesTravelled"
          value={editFormData.milesTravelled}
          onChange={changeEditData}
        ></input>
      </td>
      <td>
        {/* Fuel Used field */}
        <input
          type="text"
          name="fuelUsed"
          value={editFormData.fuelUsed}
          onChange={changeEditData}
        ></input>
      </td>
      <td>
        {/* Number Vehicles field */}
        <input
          type="text"
          name="numberVehicles"
          value={editFormData.numberVehicles}
          onChange={changeEditData}
        ></input>
      </td>
      <td>
        {/* Save Button */}
        <button type="submit">Save</button>

        {/* Cancel Button */}
        <button type="button" onClick={cancel}>
          {" "}
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
