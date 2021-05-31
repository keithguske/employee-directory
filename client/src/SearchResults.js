import React, { Component } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    }
  }

  componentDidMount() {
    const params = document.location.search.substring(1);

    fetch("/api/search?" + params).then((result) => result.json()).then((result) => {
      this.setState({results: result});
    });
  }

  render() {
    return (
      <div className="content">
        <p>{this.state.results.length} results</p>
        <List className="results-list">
          { this.state.results.map((employee) => (
            <ListItem className="results-item">
              <a href={"/employee?id=" + employee._id}>
                <ListItemAvatar>
                  <Avatar src={employee.thumbPicture}/>
                </ListItemAvatar>
              </a>
              <ListItemText primary={(<a href={"/employee?id=" + employee._id}>{employee.name}</a>)} secondary={employee.jobTitle} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}


export default SearchResults;