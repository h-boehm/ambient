import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddEntryPage from './pages/AddEntryPage';
import EditEntryPage from './pages/EditEntryPage';
import ArchivesPage from './pages/ArchivesPage';

import { useState } from 'react';

function App() {
  const [entryToEdit, setEntryToEdit, archives] = useState();
  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact>
            <HomePage setEntryToEdit={setEntryToEdit} />
          </Route>
          <Route path="/add-entry">
            <AddEntryPage />
          </Route>
          <Route path="/edit-entry">
            <EditEntryPage entryToEdit={entryToEdit} />
          </Route>
          <Route path="/archives">
            <ArchivesPage archives={archives}/>
          </Route>
        </div>
      </Router>
    </div>
  );  
}

export default App;