import React, { Component } from 'react';
import './style.css';
import UploadForm from './UploadForm.js';
import PlayerContainer from './../../containers/PlayerContainer.js';
import Library from './Library.js';

class App extends Component {
  constructor (props) {
    super(props);
    this.setSongFromPlayer = this.setSongFromPlayer.bind(this);
    this.assignSongs = this.assignSongs.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
    this.setSongFromLibrary = this.setSongFromLibrary.bind(this);
    this.setState = this.setState.bind(this);
    this.state = {
      songs: null,
      currentSong: null
    }
  }

  componentDidMount() {
    this.assignSongs()
  }

  deleteSong(songId) {
    console.log(songId);
    fetch('http://localhost:8000/api/songs/delete/', {
      method: 'POST',
      body: JSON.stringify({"id": songId}),
      headers: {
        "Content-Type": "text/plain"
      },
    }).then(
      response => response.json()
    ).then(
      success => console.log(success),
    ).then(
      this.assignSongs()
    ).catch(
      error => console.log(error),
    );
  };


  assignSongs (songs) {
    fetch('http://localhost:8000/api/songs/songnames/')
      .then(r => r.json())
      .then(data => this.setState({songs: data, currentSong: data[0].fileName}));
  }

  setSongFromLibrary (newSong) {
    this.setState({currentSong: newSong});
    console.log(this.state);
  }

  setSongFromPlayer(newSong) {
    this.setState({currentSong: newSong});
    console.log(this.state.currentSong);
  }

  render() {
    return (
      <div class="col s12 m2" className = "App">
          <div class="z-depth-2">
				<div style={{padding: '5%'}}>
        <h1>Play A Jam!</h1>
        <PlayerContainer currentSong={this.state.currentSong} songs={this.state.songs} setSongFromPlayer={this.setSongFromPlayer}/>
        <br />
        <Library deleteSong={this.deleteSong} setSongFromLibrary= {this.setSongFromLibrary} songs={this.state.songs}/>
        <br />
        <UploadForm />
				</div>
        </div>
      </div>
    );
  }

}

export default App;
