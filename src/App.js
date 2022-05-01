import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { ROWS_PER_PAGE, DOCUMENTS_ENDPOINT, USERS_ENDPOINT } from "./constants";
import GridComponent from "./GridComponent";
import company from "./resources/Company.svg";
import MobileHeaderComponent from "./MobileHeaderComponent";
import MobileMainSectionComponent from "./MobileMainSectionComponent";
import FilterComponent from "./FilterComponent";
import FooterComponent from "./FooterComponent";

function HeaderComponent({ users }) {
  return (
    <div className="header">
      <div className="logo">
        <img src={company} alt="company"></img>
      </div>
      <div className="user-section">
        <div className="user-info">
          <NotificationsIcon
            fontSize="large"
            sx={{ color: "white" }}
          ></NotificationsIcon>
        </div>

        <div className="user-info">
          <div>
            {users?.profile?.firstName} {users?.profile?.lastName}
          </div>
          <div>{users?.roles?.length && users?.roles[0]}</div>
        </div>
      </div>
    </div>
  );
}

//Requirement for Home and Contacts is not specified or showed anywhere, so I am assuming they are just dummy fields
function LeftNavComponent() {
  return (
    <div className="left-container">
      <div className="left-nav-items">Home</div>
      <div className="left-nav-items selected-item">Documents</div>
      <div className="left-nav-items">Contacts</div>
    </div>
  );
}

const PaginationComponent = ({ filterDocuments, setTableDocuments }) => {
  const [page, setPage] = useState(1);
  let numberOfPages = Math.ceil(filterDocuments.length / ROWS_PER_PAGE);

  const setFinalDocuments = (pageNumber) => {
    const paginatedData = filterDocuments.slice(
      (pageNumber - 1) * ROWS_PER_PAGE,
      pageNumber * ROWS_PER_PAGE
    );
    setTableDocuments(paginatedData);
    setPage(pageNumber);
  };

  useEffect(() => {
    setFinalDocuments(1);
  }, [filterDocuments]);

  return (
    <div className="tableFooter">
      {Array.from(Array(numberOfPages).keys()).map((el, index) => (
        <button
          key={index}
          className={`$"button} ${
            page === el + 1 ? "activeButton" : "inactiveButton"
          }`}
          onClick={() => setFinalDocuments(el + 1)}
        >
          {el + 1}
        </button>
      ))}
    </div>
  );
};

function MainSectionComponent({
  documentsList,
  tableDocuments,
  setTableDocuments,
  filterDocuments,
  setFilterDocuments,
}) {
  useEffect(() => {
    setFilterDocuments(documentsList);
  }, [documentsList]);

  return (
    <div className="center-container">
      <div className="page-title-container">
        <span className="page-title">
          <PersonIcon fontSize="large"></PersonIcon>
          Documents
        </span>
        <div className="page-sub-title">
          Managing all your documents in one place
        </div>
      </div>
      <FilterComponent
        setFilterDocuments={setFilterDocuments}
        documentsList={documentsList}
      />
      <GridComponent tableDocuments={tableDocuments} />
      <PaginationComponent
        filterDocuments={filterDocuments}
        setTableDocuments={setTableDocuments}
      />
    </div>
  );
}

function App() {
  const [documentsList, setDocumentsList] = useState([]);
  const [windowDimension, setWindowDimension] = useState(null);
  const [users, setUsers] = useState({});
  const [tableDocuments, setTableDocuments] = useState([]);
  const [filterDocuments, setFilterDocuments] = useState(documentsList);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowDimension <= 700;
  
  // Fetch documents list
  useEffect(() => {
    axios.get(DOCUMENTS_ENDPOINT).then((response) => {
      let documents = response.data.documents.filter(
        (d) => d.name.match(/\.docx$/) || d.name.match(/\.pdf$/)
      );
      documents.forEach((d) => {
        const documentDate = new Date(d.date);
        d.date = documentDate.toLocaleDateString().split("/").join(".");
      });
      setDocumentsList([...documents]);
    });
  }, []);

  // Fetch users list
  useEffect(() => {
    axios.get(USERS_ENDPOINT).then((response) => {
      setUsers(response.data.body.User);
    });
  }, []);

  if (isMobile) {
    return (
      <div className="App">
        <MobileHeaderComponent users={users} />
        <div className="main-container mobile-container">
          <MobileMainSectionComponent
            documentsList={documentsList}
            filterDocuments={filterDocuments}
            setFilterDocuments={setFilterDocuments}
            tableDocuments={tableDocuments}
            setTableDocuments={setTableDocuments}
          />
          <PaginationComponent
            filterDocuments={filterDocuments}
            setTableDocuments={setTableDocuments}
          />
        </div>
        <FooterComponent />
      </div>
    );
  } else {
    return (
      <div className="App">
        <HeaderComponent users={users} />
        <div className="main-container">
          <LeftNavComponent />
          <MainSectionComponent
            documentsList={documentsList}
            filterDocuments={filterDocuments}
            setFilterDocuments={setFilterDocuments}
            tableDocuments={tableDocuments}
            setTableDocuments={setTableDocuments}
          />
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default App;
