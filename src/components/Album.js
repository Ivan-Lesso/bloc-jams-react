import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
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
  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }
  getSongIndex(song)
  {
    return this.state.album.songs.findIndex(item => song === item);
  }
  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
      this.displayPlayIcon(song);
    } else {
      if (!isSameSong) {
        this.displaySongNumber(this.state.currentSong);
        this.setSong(song);
      }
      this.play();
      this.displayPauseIcon(song);
    }
  }
  handlePrevClick() {
    const currentIndex = this.getSongIndex(this.state.currentSong);
    const newIndex = (currentIndex-1<0)?(this.state.album.songs.length-1):currentIndex-1;
    const newSong = this.state.album.songs[newIndex];
    this.displaySongNumber(this.state.currentSong);
    this.displayPauseIcon(newSong);
    this.setSong(newSong);
    this.play();
  }
  handleNextClick() {
    const currentIndex = this.getSongIndex(this.state.currentSong);
    const newIndex = (currentIndex+1>this.state.album.songs.length-1)?0:currentIndex+1;
    const newSong = this.state.album.songs[newIndex];
    this.displaySongNumber(this.state.currentSong);
    this.displayPauseIcon(newSong);
    this.setSong(newSong);
    this.play();
  }
  handleMouseEnter(song)
  {
    const isSameSong = this.state.currentSong === song;
    if ((this.state.isPlaying && !isSameSong) || (!this.state.isPlaying)) this.displayPlayIcon(song);
  }
  handleMouseLeave(song)
  {
    const isSameSong = this.state.currentSong === song;
    if(!isSameSong) this.displaySongNumber(song);
  }
  displayPauseIcon(song)
  {
    const currentIndex = this.getSongIndex(song);
    var songIconElement = document.getElementById("song_icon_"+currentIndex);
    songIconElement.innerHTML = '';
    songIconElement.className = 'icon ion-ios-pause';
  }
  displayPlayIcon(song)
  {
    const currentIndex = this.getSongIndex(song);
    var songIconElement = document.getElementById("song_icon_"+currentIndex);
    songIconElement.innerHTML = '';
    songIconElement.className = 'icon ion-ios-play';
  }
  displaySongNumber(song)
  {
    const currentIndex = this.getSongIndex(song);
    var songIconElement = document.getElementById("song_icon_"+currentIndex);
    songIconElement.innerHTML = currentIndex + 1;
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
            <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleMouseEnter(song)} onMouseLeave={() => this.handleMouseLeave(song)}>
              <td><span id={"song_icon_"+index} className={index===0 ? 'icon ion-ios-play' : ''}>{index===0 ? '' : index + 1}</span></td>
              <td>{song.title}</td>
              <td>{Math.ceil(song.duration)}</td>
            </tr>
          )
          }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
        />
      </section>
    );
  }
}

export default Album;
