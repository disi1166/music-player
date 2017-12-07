import SongModel from 'js/models/songModel';
import SongsCollection from 'js/collections/songsCollection';
import SongComponent from 'js/views/songComponent';
import SongsTemplate from 'templates/songsTemplate.html';

var SongsComponent = Backbone.View.extend({
    className: 'songs',
    template: _.template(SongsTemplate),

    initialize: function() {
      this.collection.on('playSong', this.songPlayed, this);
    },
    render: function() {
      this.$el.html(this.template());
      this.songsList = this.$el.find('.songs__songsList');
      this.collection.each(this.renderSong, this);
      return this;
    },
    renderSong: function(song) {
      var songComponent = new SongComponent({model: song});
      this.songsList.append(songComponent.render().el);
    },
    songPlayed: function(song) {
      this.trigger('songPlayed', song);
    }
});
export default SongsComponent;
