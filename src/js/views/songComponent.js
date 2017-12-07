import SongModel from 'js/models/songModel';
import SongTemplate from 'templates/songTemplate.html';

var SongComponent = Backbone.View.extend({
    tagName: 'div',
    className: 'song',
    events: {
      'click .song__play-pause-button': 'playPauseSong'
    },
    template:  _.template(SongTemplate),
    model: SongModel,
    initialize: function() {
      this.model.on('playSong', this.playSong, this);
      this.model.on('pauseSong', this.pauseSong, this);
      this.model.on('stopSong', this.stopSong, this);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    playPauseSong: function() {
      if (this.model.get('playing')) {
        this.model.pauseSong();
      } else {
        this.model.playSong();
      }
    },
    playSong: function() {
      this.$el.addClass(this.className + '--selected');
      this.$el.addClass(this.className + '--playing');
    },
    pauseSong: function() {
      this.$el.removeClass(this.className + '--playing');
    },
    stopSong: function() {
      this.$el.removeClass(this.className + '--selected');
      this.$el.removeClass(this.className + '--playing');
    }
});
export default SongComponent;
