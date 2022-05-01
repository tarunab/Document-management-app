import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import frLocale from "date-fns/locale/fr";
import React, { useState } from "react";

function FilterComponent({ setFilterDocuments, documentsList }) {
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);

  const filterDocumentsList = () => {
    const filteredData = documentsList.filter((doc) => {
      const docDate = new Date(doc.date.replace(/-/g, "/"));
      return docDate >= fromValue && docDate <= toValue;
    });

    setFilterDocuments(filteredData);
  };

  return (
    <div className="filter-container">
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
        <div className="filter-elements">
          <DatePicker
            mask="__/__/____"
            label="From"
            value={fromValue}
            onChange={(newValue) => {
              setFromValue(newValue);
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </div>
        <div className="filter-elements">
          <DatePicker
            label="To"
            value={toValue}
            onChange={(newValue) => {
              setToValue(newValue);
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </div>
      </LocalizationProvider>
      <button
        className="btn primary-button"
        onClick={() => filterDocumentsList()}
      >
        Apply filters
      </button>
      <button
        className="btn secondary-button"
        onClick={() => setFilterDocuments(documentsList)}
      >
        Clear filters
      </button>
    </div>
  );
}

export default FilterComponent;
