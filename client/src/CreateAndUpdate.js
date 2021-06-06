import React, { Component } from 'react';
import { 
  FormControl, 
  InputLabel, 
  TextField, 
  Select,
  MenuItem, 
  Button, 
  Avatar 
} from '@material-ui/core';
import { withSnackbar } from 'notistack';

class CreateAndUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createMode: false,
      updateMode: false,
      initialName: '',
      employee: {
        id: '',
        name: '',
        department: '',
        picture: '',
        jobTitle: '',
        location: ''
      }
    }
  }

  componentDidMount() {
    const rawParams = document.location.search.substring(1);
    const params = new URLSearchParams(rawParams);

    if(!params.has('id')) {
      this.setState({createMode: true});
    }
    else {
      fetch("/api/employee?" + rawParams).then((result) => result.json()).then((result) => {
        if(result.message) {
          this.setState({createMode: true});
        }
        else {
          result.id = params.get('id');
          this.setState({
            employee: result, 
            updateMode: true, 
            initialName: result.name
          });
        }
      });
    }
  }

  handleInputChange = (e) => {
    const {name, value} = e.target;

    const myEmployee = this.state.employee;
    myEmployee[name] = value;

    this.setState({
      employee: myEmployee
    });
  }

  handleSubmit = (event) => {
    const data = new URLSearchParams(new FormData(event.target));
    console.log(data, event.target);
    fetch("/api/createandupdate", {
      method: 'post',
      body: data
    }).then((result) => result.json()).then((result) => {
      if(this.state.updateMode) {
        this.props.enqueueSnackbar('Successfully modified ' + this.state.employee.name);
        this.setState({
          initialName: this.state.employee.name
        });
      }
      else if(this.state.createMode) {
        this.props.enqueueSnackbar('Successfully created ' + this.state.employee.name);

        this.setState({
          createMode: false,
          updateMode: true,
          initialName: this.state.employee.name
        });
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="content">
        {this.state.createMode && 
          <h2>Create Employee</h2>
        }
        {this.state.updateMode &&
          <h2>Modify {this.state.initialName}</h2>
        }
        <form 
          className="create-update-form" 
          action="/api/createandupdate" 
          method="post"
          onSubmit={this.handleSubmit}
          >
          <Avatar className="create-update-avatar" src={this.state.employee.picture}/>
          <TextField className="hidden-field create-update-field" name="id" value={this.state.employee.id} type="text" onChange={this.handleInputChange} />
          <TextField
            id="name-input"
            className="create-update-field"
            name="name"
            label="Name"
            type="text"
            value={this.state.employee.name}
            onChange={this.handleInputChange}
          />
          <FormControl className="create-update-field">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={this.state.employee.department}
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
            className="create-update-field"
            name="jobTitle"
            label="Job Title"
            type="text"
            value={this.state.employee.jobTitle}
            onChange={this.handleInputChange}
          />
          <TextField
            id="location-input"
            className="create-update-field"
            name="location"
            label="Location"
            type="text"
            value={this.state.employee.location}
            onChange={this.handleInputChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }

}

export default withSnackbar(CreateAndUpdate);