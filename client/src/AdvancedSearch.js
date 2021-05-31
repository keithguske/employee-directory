import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel } from '@material-ui/core';

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);

    const getParams = new URLSearchParams(document.location.search.substring(1));

    this.state = {
      name: getParams.get('name'),
      jobTitle: getParams.get('jobTitle'),
      department: getParams.get('department'),
      location: getParams.get('location')
    }
  }

  handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <form action="/search" className="advanced-search">
        <TextField
          id="name-input"
          name="name"
          label="Name"
          type="text"
          value={this.state.name}
          onChange={this.handleInputChange}
          autoFocus="true"
        />
        <FormControl>
          <InputLabel>Department</InputLabel>
          <Select
            name="department"
            value={this.state.department}
            onChange={this.handleInputChange}
            className="department-select"
          >
            <MenuItem key="" value="">&nbsp;</MenuItem>
            <MenuItem key="marketing" value="marketing">
              Marketing
            </MenuItem>
            <MenuItem key="finance" value="finance">
              Finance
            </MenuItem>
            <MenuItem key="operations" value="operations">
              Operations Management
            </MenuItem>
            <MenuItem key="hr" value="hr">
              Human Resources
            </MenuItem>
            <MenuItem key="it" value="it">
              Information Technology
            </MenuItem>
            <MenuItem key="other" value="other">
              Other
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="jobTitle-input"
          name="jobTitle"
          label="Job Title"
          type="text"
          value={this.state.jobTitle}
          onChange={this.handleInputChange}
        />
        <TextField
          id="location-input"
          name="location"
          label="Location"
          type="text"
          value={this.state.location}
          onChange={this.handleInputChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>
    );
  }
}

export default AdvancedSearch;