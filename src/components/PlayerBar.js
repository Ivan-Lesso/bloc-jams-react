import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="playerDiv">
        <div className="row">
          <div className="col-sm-12">
            <div className="">
              <div className="card-body col-md-6 d-inline-block text-right">
                <section id="buttons">
                  <button id="previous" className="playerButtons" onClick={this.props.handlePrevClick}>
                    <span className="icon ion-ios-skip-backward"></span>
                  </button>
                  <button id="play-pause" className="playerButtons" onClick={this.props.handleSongClick} >
                    <span className={this.props.isPlaying ? 'icon ion-ios-pause' : 'icon ion-ios-play'}></span>
                  </button>
                  <button id="next" className="playerButtons" onClick={this.props.handleNextClick}>
                    <span className="icon ion-ios-skip-forward"></span>
                  </button>
                </section>
              </div>
              <div className="card-body col-md-6 d-inline-block text-left">
                <section className="player-bar">
                    <div className="current-time d-inline playerControls">{this.props.formatTime(this.props.currentTime)}</div>
                    <input
                      type="range"
                      className="seek-bar"
                      value={(this.props.currentTime / this.props.duration) || 0}
                      max="1"
                      min="0"
                      step="0.01"
                      onChange={this.props.handleTimeChange}
                    />
                    <div className="total-time d-inline playerControls">{this.props.formatTime(this.props.duration)}</div>
                    <div className="icon ion-md-volume-low d-inline playerControls"></div>
                    <input
                      type="range"
                      className="seek-bar"
                      value={(this.props.currentVolume) || 0}
                      max="1"
                      min="0"
                      step="0.01"
                      onChange={this.props.handleVolumeChange}
                    />
                    <div className="icon ion-md-volume-high d-inline playerControls"></div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PlayerBar;
