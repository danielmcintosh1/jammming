import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from  '../SearchResults/SearchResults';
import Playlist from  '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
       searchResults: [] ,
      playlistName: 'Daniels Playlist',
      playlistTracks: []
    };

      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
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

  updatePlaylistName(newName) {
    this.setState({playlistName: newName});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(playlistTrack =>  playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(()=>  {this.setState({
        searchResults: [],
        playlistTracks: []
      })

      this.updatePlaylistName('New Playlist')
  })
  }

  search(term) {
    Spotify.search(term)
      .then(tracks => {
      this.setState({ searchResults: tracks });
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch = {this.search}/>
          <div className="App-playlist">
            <SearchResults
              searchResults = {this.state.searchResults}
              onAdd = {this.addTrack}/>
            <Playlist
              playlistName = {this.state.playlistName}
              playlistTracks = {this.state.playlistTracks}
              onRemove = {this.removeTrack}
              onNameChange = {this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
