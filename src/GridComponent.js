import React from "react";
import styles from "./GridComponent.css";
import axios from "axios";


/*'Descripton' & 'Owner' fields are not provided in the given JOSN from API:'https://frontend.apply.crosslend.dev/documents.json'
So these columns are shown as empty on UI*/
const GridComponent = ({ tableDocuments }) => {
  return (
    <div className="grid-container">
      <table className="table">
        <thead className="tableRowHeader">
          <tr>
            <th className="tableHeader">Document name</th>
            <th className="tableHeader">Description</th>
            <th className="tableHeader">Owner</th>
            <th className="tableHeader">Created On</th>
          </tr>
        </thead>
        <tbody>
          {tableDocuments.map((el, i) => (
            <tr className="tableRowItems" key={el.name + i}>
              <td className="table-cell">{el.name}</td>
              <td className="table-cell">{el.description}</td>
              <td className="table-cell">{el.owner}</td>
              <td className="table-cell">{el.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridComponent