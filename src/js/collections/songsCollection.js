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
    if (newSelectedSongIndex != this.selectedSongIndex) {
      if (this.selectedSongIndex !== null) {
        let s = this.at(this.selectedSongIndex);
        s.stopSong();
      }
      this.selectedSongIndex = newSelectedSongIndex;
    }
  },
  playNextSongIfAvailable: function() {
    if (this.selectedSongIndex < this.length - 1) {
      this.selectedSongIndex++;
      this.at(this.selectedSongIndex).playSong();
    }
  }
});

export default SongsCollection;
