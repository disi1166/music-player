import SongModel from 'js/models/songModel';
import ControlBarTemplate from 'templates/controlBarTemplate.html';
import SongComponent from 'js/views/songComponent'

var ControlBarComponent = SongComponent.extend({
    className: 'control-bar',
    template: _.template(ControlBarTemplate),
    model: new SongModel(),
    events: {
      'click .control-bar__play-pause-button': 'playPauseSong'
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    start: function(song) {
      this.initializeSong(song);
      this.playSong();
      this.render();
    },
    initializeSong: function(song) {
      this.model = song;
      this.model.on('playSong', this.playSong, this);
      this.model.on('pauseSong', this.pauseSong, this);
      this.model.on('stopSong', this.stopSong, this);
      this.model.on('change:formattedRemainingTime', this.render, this);
      this.model.startTimer();
    },
    stopSong: function() {
      SongComponent.prototype.pauseSong.apply(this);
      this.model = new SongModel();
      this.render();
    }
});
export default ControlBarComponent;
