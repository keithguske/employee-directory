import React, { Component } from 'react';
import { Avatar, Button } from '@material-ui/core';
import { withSnackbar } from 'notistack';

class Employee extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      employee: {}
    }
  }

  componentDidMount() {
    const params = document.location.search.substring(1);

    fetch("/api/employee?" + params).then((result) => result.json()).then((result) => {
      console.log(result);

      if(result.message) {
        this.setState({employee: {name: result.message}});
      }
      else {
        this.setState({employee: result});
      }
    });
  }

  handleDelete = () => {
    const id = this.state.employee._id;

    fetch("/api/delete?id=" + id).then((result) => result.json()).then((result) => {
      console.log(result);

      if(result.message) {
        this.props.enqueueSnackbar('Failed to delete ' + this.state.employee.name);
      }
      else {
        this.props.enqueueSnackbar('Successfully deleted ' + this.state.employee.name);
      }
    });
  }

  render() {
    return (
      <div className="content">
        <div className="business-card">
          <Avatar className="business-card-avatar" src={this.state.employee.picture}/>
          <h3 className="business-card-name">{this.state.employee.name}</h3>
          <p className="business-card-job">{this.state.employee.jobTitle}</p>
          <p className="business-card-location">{this.state.employee.location}</p>
        </div>
        <Button 
          className="action-button"
          href={'/edit?id=' + this.state.employee._id}
          variant="contained"  
          color="primary"
        >
            Edit
        </Button>
        <Button
          className="action-button"
          onClick={this.handleDelete}
          variant="contained"  
          color="primary"
        >
          Delete
        </Button>
      </div>
    );
  }
}

export default withSnackbar(Employee);