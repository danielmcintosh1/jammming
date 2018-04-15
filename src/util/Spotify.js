const client_id = 'be5e86185b5348a6bc8598b1c2c5f3aa';
const redirect_uri = 'http://localhost:3000/';

let accessToken = undefined;
let expires_in = undefined;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
      const url = window.location.href;
      const accessTokenString = url.match(/access_token=([^&]*)/);
      const expires_inString = url.match(/expires_in=([^&]*)/);
        if (accessTokenString && expires_inString) {
          accessToken = accessTokenString[1];
          expires_in = expires_inString[1];
          window.setTimeout(() => accessToken = '', expires_in * 1000);
          window.history.pushState('Access Token', null, '/');
        } else {
          window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
        }
      }
,
    search(term) {
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}` }

      })
      .then( function(response) {
        return response.json();
      })
      .then( function (jsonResponse){
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }));
          } else {
            return [];
          }
        }
      );
    },

    savePlaylist(playlistName, uriArray) {
      if(playlistName && uriArray) {
        const headers = {
          Authorization: `Bearer ${accessToken}`
          };
        let userId = '';
        let playlistId = undefined;
        const userUrl = 'https://api.spotify.com/v1/me';
        fetch(userUrl, {
          headers: headers
        })
        .then( function(response) {
          return response.json();
        })
        .then( function (jsonResponse){
          return userId = jsonResponse.id
        })
        .then(() => {
          const createPlaylistUrl =  `https://api.spotify.com/v1/users/${userId}/playlists`;
          fetch(createPlaylistUrl, {
            method: `POST`,
            headers: headers,
            body: JSON.stringify({name: playlistName})
          })
        })
        .then( function(response) {
            return response.json();
          })
          .then( function (jsonResponse){
            return playlistId = jsonResponse.id
          })
          .then(() => {
            const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
            fetch(addPlaylistTracksUrl, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({
                uris: uriArray
              })
            })
        });
      } else return
    }
};

export default Spotify;
