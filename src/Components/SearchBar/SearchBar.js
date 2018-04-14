import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(term) {
    this.props.onSearch(term)
  }

  handleTermChange(termChangeEvent) {
    const term = termChangeEvent.target.value;
    this.setState({term: term});
  }

  handleNameChange(onChangeEvent) {
    const name = onChangeEvent.target.value;
    this.props.onNameChange(name);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
        placeholder="Enter A Song, Album, or Artist"
        onChange = {this.handleTermChange} />
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
