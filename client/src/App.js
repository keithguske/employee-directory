import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from '@material-ui/core';

import AdvancedSearch from './AdvancedSearch.js';
import SearchResults from './SearchResults.js';
import Employee from './Employee.js';
import CompressedAdvancedSearch from './CompressedAdvancedSearch.js';
import CreateAndUpdate from './CreateAndUpdate.js';

function App() {
  return (
    <Router>
      <div>
        <div>
          <Link className="home-link" to='/'>
            <h1>Hooli Employee Directory</h1>
          </Link>
        </div>

        <Switch>
         <Route path="/create">
            <CreateAndUpdate />
          </Route>
          <Route path="/edit">
            <CreateAndUpdate />
          </Route>
          <Route path="/employee">  
            <CompressedAdvancedSearch />
            <Employee />
          </Route>
          <Route path="/search">
            <h2>Search Results</h2>
            <AdvancedSearch />
            <SearchResults />
          </Route>
          <Route path="/">
            <AdvancedSearch />
            <Button 
              className="action-button"
              href="/create"
              variant="contained"  
              color="primary"
            >
              Create
            </Button>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
