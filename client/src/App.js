import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AdvancedSearch from './AdvancedSearch.js';
import SearchResults from './SearchResults.js';

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
          <Route path="/search">
            <h2>Search Results</h2>
            <AdvancedSearch />
            <SearchResults />
          </Route>
          <Route path="/">
            <AdvancedSearch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
