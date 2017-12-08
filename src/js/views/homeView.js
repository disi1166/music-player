import SongsComponent from 'js/views/songsComponent';
import ControlBarComponent from 'js/views/controlBarComponent';

var HomeView = Backbone.View.extend({
  el: 'body',
  initialize: function() {
    this.songsComponent = new SongsComponent({collection: this.collection});
    this.controlBarComponent = new ControlBarComponent();
    this.collection.on('playSong', this.songPlayed, this);
  },
  render: function() {
    this.$el.html(this.songsComponent.render().el);
    this.$el.append(this.controlBarComponent.render().el)
  },
  songPlayed: function(song) {
    if (this.newSongPlayed(song)) {
      this.controlBarComponent.startSong(song);
    }
  },
  newSongPlayed: function(song) {
    return this.controlBarComponent.model.get('id') !== song.get('id')
  }
});
export default HomeView;
