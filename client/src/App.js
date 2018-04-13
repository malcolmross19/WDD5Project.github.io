import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: ''}
    }
    this.getNowPlaying = this.getNowPlaying.bind(this);
    this.getHashParams = this.getHashParams.bind(this);
  }

  getNowPlaying(){
  spotifyApi.getMyCurrentPlaybackState()
    .then((response) => {
      console.log(response)
      this.setState({
        nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
      });
    })
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }
  render() {
    return (
      <div className="App">
        <h1>Login to Spotify to use Name That Tune</h1>
        <a href="http://localhost:8888">Login to Spotify</a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 650 }}/>
        </div>
        {this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
      </div>
    );
  }
}

export default App;
