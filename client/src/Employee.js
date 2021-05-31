import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';

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

  render() {
    return (
      <div className="content">
        <div className="business-card">
          <Avatar className="business-card-avatar" src={this.state.employee.picture}/>
          <h3 className="business-card-name">{this.state.employee.name}</h3>
          <p className="business-card-job">{this.state.employee.jobTitle}</p>
          <p className="business-card-location">{this.state.employee.location}</p>
        </div>
      </div>
    );
  }
}

export default Employee;