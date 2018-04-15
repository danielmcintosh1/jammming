const client_id = 'be5e86185b5348a6bc8598b1c2c5f3aa';
const redirect_uri = 'http://localhost:3000/';

let accessToken = '';
let expires_in = '';

const Spotify = {
  getAccessToken(accessToken) {
    if (accessToken === '') {
      let url = window.location.href;
      let accessTokenString = url.match(/access_token=([^&]*)/);
      let expires_inString = url.match(/expires_in=([^&]*)/);
        if (accessTokenString !== null){
          accessToken = accessTokenString;
          expires_in = expires_inString;
          window.setTimeout(() => accessToken = '', expires_in * 1000);
          window.history.pushState('Access Token', null, '/');
        } else {
          window.location.href = `https://accounts.spotify.com/authorize?client_id= ${client_id} &response_type=token&scope=playlist-modify-public&redirect_uri= ${redirect_uri}`;
        }
      }
    }
,
    search(term) {
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then( function(response) {
        return response.json();
      }).then( function (jsonResponse){
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.map( track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              url: track.uri
              }));
          }
        }
      );
    }
};

export default Spotify;
