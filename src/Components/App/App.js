import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from  '../SearchResults/SearchResults';
import Playlist from  '../Playlist/Playlist';

const track = {
  name: 'Track 1',
  album: 'Album 1',
  artist: 'Artist 1',
  id: '1'
};

const track2 = {
  name: 'Track 2',
  album: 'Album 1',
  artist: 'Artist 1',
  id: '2'
};

const track3 = {
  name: 'Track 3',
  album: 'Album 1',
  artist: 'Artist 1',
  id: '3'
};

const searchResultsFake = [
  track,
  track2,
  track3
];


class App extends Component {
  constructor(props) {
    super(props);

  this.state = {
    searchResults: {searchResultsFake}
    };

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
