import React from "react";

// Passing required functions inside the component
const Row = ({ rowData, deleteData, clickEdit }) => {
  return (
    <tr>

      {/* Setting the required values to row data */}
      <td>{rowData.personLocation}</td>
      <td>{rowData.matchCount}</td>
      <td>{rowData.timeTaken}</td>
      <td>{rowData.milesTravelled}</td>
      <td>{rowData.fuelUsed}</td>
      <td>{rowData.numberVehicles}</td>
      <td>
        
        {/* Edit Button */}
        <button type="button" onClick={(event) => clickEdit(event, rowData)} style={{marginRight: "7px"}}>
          Edit
        </button>

        {/* Delete Button */}
        <button type="button" onClick={() => deleteData(rowData.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Row;
