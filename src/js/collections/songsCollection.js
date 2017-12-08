import SongModel from 'js/models/songModel';

var SongsCollection = Backbone.Collection.extend({
  model: SongModel,
  selectedSongIndex: null,
  initialize: function () {
    this.on('playSong', this.updateSelectedSong, this);
    this.on('songFinished', this.playNextSongIfAvailable, this);
  },
  updateSelectedSong: function(song) {
    let newSelectedSongIndex = this.indexOf(song);
    if (this.differentSongCurrentlyPlaying(newSelectedSongIndex)) {
      let currentSong = this.at(this.selectedSongIndex);
      currentSong.stopSong();
    }
    this.selectedSongIndex = newSelectedSongIndex;
  },
  playNextSongIfAvailable: function() {
    if (this.selectedSongIndex < this.length - 1) {
      this.selectedSongIndex++;
      this.at(this.selectedSongIndex).playSong();
    } else {
      this.selectedSongIndex = null;
    }
  },
  differentSongCurrentlyPlaying: function(newSelectedSongIndex) {
    return this.selectedSongIndex !== null && newSelectedSongIndex != this.selectedSongIndex;
  }
});

export default SongsCollection;
