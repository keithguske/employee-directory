import React, { Component } from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import AdvancedSearch from './AdvancedSearch';


class CompressedAdvancedSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0
    };

  }

  componentDidMount() {
    this.setState({width: window.innerWidth});

    const handleResizeWindow = () => this.setState({width: window.innerWidth});
    window.addEventListener("resize", handleResizeWindow);

  }

  render() {
    const breakpoint = 700;
    
    if (this.state.width > breakpoint) {
      return (
        <AdvancedSearch />
      );
    }
    return (
      <Accordion className="compressed-search-accordion">
        <AccordionSummary>
          <SearchIcon />
          Search
        </AccordionSummary>
        <AccordionDetails>
          <AdvancedSearch />
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default CompressedAdvancedSearch;