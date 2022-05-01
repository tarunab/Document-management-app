import React, { useState, useEffect } from "react";
import "./MobileHeaderComponent.css";
import MenuIcon from "@mui/icons-material/Menu";
import company from "./resources/Company.svg";

function DropdownMenu({ open, users }) {
  if (open) {
    return (
      <div className="dropdown">
        <div className="menu">
          <div className="left-nav-items">Home</div>
          <div className="left-nav-items selected-item">Documents</div>
          <div className="left-nav-items">Contacts</div>
        </div>
        <div>
        <div className="left-nav-items">{users?.profile?.firstName}</div>
          <div className="left-nav-items">{users?.profile?.lastName}</div>
        </div>
      </div>
    );
  }
  return;
}

function MobileHeaderComponent({ setUsers, users }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="header mobile-header">
      <div className="logo">
        <img src={company} alt="company"></img>
      </div>
      <div className="mobile-section user-section">
        <div className="user-info">
          <MenuIcon
            fontSize="large"
            sx={{ color: "white" }}
            onClick={() => setOpen(!open)}
          ></MenuIcon>
        </div>

        <DropdownMenu open={open} users={users}></DropdownMenu>
      </div>
    </div>
  );
}

export default MobileHeaderComponent;
