import React, { useState, useEffect } from "react";
import FilterComponent from "./FilterComponent";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GridComponent from "./GridComponent";
import "./MobileMainSectionComponent.css";
function MobileMainSectionComponent({
  documentsList,
  setFilterDocuments,
  tableDocuments,
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setFilterDocuments(documentsList);
  }, [documentsList]);

  return (
    <div className="mobile-main-section">
      <div className="page-title-container">
        <span className="mobile-page-title">Documents</span>
      </div>
      <button className="btn primary-button" onClick={() => setOpen(!open)}>
        <FilterAltIcon />
        <span>Filters</span>
      </button>
      {open && (
        <FilterComponent
          setFilterDocuments={setFilterDocuments}
          documentsList={documentsList}
        />
      )}
    </div>
  );
}

export default MobileMainSectionComponent;
