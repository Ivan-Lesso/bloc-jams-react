import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentSongIndex: 0,
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }
  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }
  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }
  setSong(song, index) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song, currentSongIndex: index });
  }
  handleSongClick(song,index) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
      this.displayPlayIcon(index);
    } else {
      if (!isSameSong) {
        this.displaySongNumber(this.state.currentSongIndex);
        this.setSong(song, index);
      }
      this.play();
      this.displayPauseIcon(index);
    }
  }
  handleMouseEnter(song, index)
  {
    const isSameSong = this.state.currentSong === song;
    if ((this.state.isPlaying && !isSameSong) || (!this.state.isPlaying)) this.displayPlayIcon(index);
  }
  handleMouseLeave(song, index)
  {
    const isSameSong = this.state.currentSong === song;
    if((!this.state.isPlaying) || (this.state.isPlaying && !isSameSong)) this.displaySongNumber(index);
  }
  displayPauseIcon(index)
  {
    var songIconElement = document.getElementById("song_icon_"+index);
    songIconElement.innerHTML = '';
    songIconElement.className = 'icon ion-ios-pause';
  }
  displayPlayIcon(index)
  {
    var songIconElement = document.getElementById("song_icon_"+index);
    songIconElement.innerHTML = '';
    songIconElement.className = 'icon ion-ios-play';
  }
  displaySongNumber(index)
  {
    var songIconElement = document.getElementById("song_icon_"+index);
    songIconElement.innerHTML = index + 1;
    songIconElement.className = '';
  }
  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
          <h1 id="album-title">{this.state.album.title}</h1>
          <h2 className="artist">{this.state.album.artist}</h2>
          <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
          {
            this.state.album.songs.map((song, index) =>
            <tr className="song" key={index} onClick={() => this.handleSongClick(song,index)} onMouseEnter={() => this.handleMouseEnter(song, index)} onMouseLeave={() => this.handleMouseLeave(song, index)}>
              <td><span id={"song_icon_"+index}>{index + 1}</span></td>
              <td>{song.title}</td>
              <td>{(song.duration-(song.duration%=60))/60+(9<song.duration?':':':0')+Math.ceil(song.duration)}</td>
            </tr>
          )
          }
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
