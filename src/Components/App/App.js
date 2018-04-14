import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from  '../SearchResults/SearchResults';
import Playlist from  '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
       searchResults: [{
        name: 'Track 1',
        album: 'Album 1',
        artist: 'Artist 1',
        id: '1'
   }, {
        name: 'Track 2',
        album: 'Album 1',
        artist: 'Artist 1',
        id: '2'
   }, {
        name: 'Track 3',
        album: 'Album 1',
        artist: 'Artist 1',
        id: '3'
   }] ,
      playlistName: 'Daniels Playlist',
      playlistTracks: [{
        name: 'Track 1',
        album: 'Album 2',
        artist: 'Artist 1',
        id: '4'
      }, {
        name: 'Track 2',
        album: 'Album 2',
        artist: 'Artist 1',
        id: '5'
      }]
    };

      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
  return;
    } else {
  let tracks = this.state.playlistTracks;
  tracks.push(track);
  this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    const removeTrack = tracks.filter(playlistTrack => track.id !== playlistTrack.id);
    this.setState({playlistTracks: removeTrack});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults = {this.state.searchResults}
              onAdd = {this.addTrack}/>
            <Playlist
              playlistName = {this.state.playlistName}
              playlistTracks = {this.state.playlistTracks}
              onRemove = {this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
