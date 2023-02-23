import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("main");
  const [sections, setSections] = useState([{ name: "Section 1", guests: [] }]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const allGuests = sections.reduce((acc, section) => {
      return [...acc, ...section.guests];
    }, []);
    setGuests(allGuests);
  }, [sections]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        name: `Section ${sections.length + 1}`,
        guests: [],
      },
    ]);
  };

  const addGuest = (sectionIndex, guestName) => {
    setSections((prevSections) =>
      prevSections.map((section, index) => {
        if (index === sectionIndex) {
          return {
            ...section,
            guests: [...section.guests, guestName],
          };
        }
        return section;
      })
    );
  };

  const handleGuestFormSubmit = (event, sectionIndex, guestName) => {
    event.preventDefault();
    addGuest(sectionIndex, guestName);
    setPage("guestList");
  };



  // Main page 
  const renderMainPage = () => {
    return (
      <div className="mainPage">
        <img src="https://th.bing.com/th/id/R.53f07aec225aa7011e540039f4cd609f?rik=ODLPWdW1M%2fIWBw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fwedding-clipart-transparent-background%2fwedding-clipart-transparent-background-24.png&ehk=Wpi%2fHFH4gFomPspYI75K0Cp34JeU4%2b5DYrdwETxk91g%3d&risl=&pid=ImgRaw&r=0" />
        <div>
          <h2>Start your Guest List today!</h2>
          <button onClick={() => setPage("guestList")}>Add Guests</button>
        </div>
      </div>
    );
  };




  const renderGuestListPage = () => {
    return (
      <div className="App">
        <h1>Guest List</h1>
        <button onClick={() => setPage("main")}>Go back</button>
        {sections.map((section, index) => (
          <GuestSection
          key={index}
          section={section}
          onAddGuest={() => setPage(`addGuest-${index}`)}
          />
          ))}
          <button onClick={addSection} style={{display:'flex', margin:"auto"}}>Add Section</button>
      </div>
    );
  };




  const renderAddGuestPage = (sectionIndex) => {
    return (
      <div className="App">
        <h1>Add Guest</h1>
        <form
          onSubmit={(event) =>
            handleGuestFormSubmit(
              event,
              sectionIndex,
              event.target.elements.guestName.value
            )
          }
        >
          <label>
            Name:
            <input type="text" name="guestName" />
          </label>
          <button type="submit">Add +</button>
        </form>
        <button onClick={() => setPage("guestList")}>
          Go back to Guest List
        </button>
      </div>
    );
  };

  const renderAllGuestsPage = () => {
    return (
      <div className="App">
        <h1>All Guests</h1>
        <ul>
          {guests.map((guest, index) => (
            <li key={index}>{guest}</li>
          ))}
        </ul>
        <button onClick={() => setPage("guestList")}>Go back to Guest List</button>
      </div>
    );
  };

  const renderPage = () => {
    if (page === "main") {
      return renderMainPage();
    }
    if (page === "guestList") {
      return renderGuestListPage();
    }
    if (page.startsWith("addGuest-")) {
      const sectionIndex = Number(page.split("-")[1]);
      return renderAddGuestPage(sectionIndex);
    }
    return null;
  };

  return renderPage();
}


function GuestSection({ section, onAddGuest }) {
  return (
    <div className="GuestSection">
      <h2>{section.name}</h2>
      <p>Number of Guests: {section.guests.length}</p>
      <>
        {section.guests.map((guest, index) => (
          <li key={index} style={{ textAlign: "center" }}>{guest}</li>
        ))}
      </>
      <button onClick={onAddGuest}>Add a Guest</button>
    </div>
  );
}

export default App;
