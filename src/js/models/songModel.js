import Backbone from 'backbone';

var SongModel = Backbone.Model.extend({
  pausedTime: null,
  songTotalPauseTime: 0,
  audioTrack: null,
  defaults: {
    title: "",
    artist: "",
    duration: null,
    formattedDuration: "",
    playing: false
  },

  initialize: function() {
    if (this.get('duration') !== undefined) {
      this.setFormattedDuration();
      this.setFormattedRemainingTime(this.get('duration'));
    }
  },

  setFormattedDuration: function() {
    let duration = this.get('duration');
    this.set('formattedDuration', this.formatDuration(duration));
  },

  playSong: function() {
    this.set({playing: true});
    this.trigger('playSong', this);
    this.updateTotalPausedTime();
    this.reproduceAudio();
  },

  updateTotalPausedTime: function() {
    if (this.pausedTime != null) {
      let lastPauseTime = this.getCurrentTime() - this.pausedTime;
      this.songTotalPauseTime += lastPauseTime;
    }
  },

  reproduceAudio: function() {
    if (this.audioTrack === null) {
      this.audioTrack = new Audio('webpack_assets/songs/' + this.get('title') + '.mp3');
    }
    this.audioTrack.play();
  },

  pauseSong: function() {
    this.set({playing: false});
    this.trigger('pauseSong');
    this.pausedTime = this.getCurrentTime();
    this.audioTrack.pause();
  },

  stopSong: function() {
    this.set({playing: false});
    this.trigger('stopSong');
    this.resetSong();
    this.stopAudioReproduction();
    clearInterval(this.countdouwn);
  },

  resetSong: function() {
    this.songTotalPauseTime = 0;
    this.pausedTime = null;
    this.setFormattedRemainingTime(this.get('duration'));
  },

  stopAudioReproduction: function() {
    this.audioTrack.pause();
    this.audioTrack.currentTime = 0;
    this.audioTrack = null;
  },

  startTimer: function() {
    this.songStartTime = this.getCurrentTime();
    this.countdouwn = setInterval(() => {
        this.oneSecElapsed();
    }, 1000);
  },

  oneSecElapsed: function() {
    if (this.get('playing')) {
      let songElapsedTime = this.calculateSongElapsedTime();
      if (songElapsedTime > this.get('duration')) {
        this.songFinished();
        return;
      }
      this.updateCountdown(songElapsedTime);
    }
  },

  getCurrentTime: function() {
    return new Date().getTime();
  },

  calculateSongElapsedTime: function() {
    let currentTime = this.getCurrentTime();
    return Math.round((currentTime - (this.songStartTime + this.songTotalPauseTime)) / 1000);
  },

  songFinished: function() {
    this.stopSong();
    this.trigger('songFinished');
  },

  updateCountdown: function(songElapsedTime) {
    let songRemainingTime = this.get('duration') - songElapsedTime;
    this.setFormattedRemainingTime(songRemainingTime);
  },

  setFormattedRemainingTime: function (remainingTime) {
    this.set({formattedRemainingTime: this.formatDuration(remainingTime)})
  },

  formatDuration: function(duration) {
    if (duration === null) {
      return "";
    }
    let hours = Math.floor(duration/3600);
    let hoursString = hours > 0 ? hours + ":" : "";

    let minutesToBeFormatted = duration - (hours * 3600);
    let minutes = Math.floor(minutesToBeFormatted / 60);
    let minutesString = "";
    if (hoursString !== "" && minutes < 10) {
      minutesString += "0";
    }
    minutesString += minutes + ":";

    let seconds = minutesToBeFormatted - (minutes * 60);
    let secondsString = "";
    if (seconds < 10) {
      secondsString += "0";
    }
    secondsString += seconds;
    return hoursString + minutesString + secondsString;
  }
});
export default SongModel;
