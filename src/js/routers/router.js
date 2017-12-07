import Backbone from 'backbone';
import HomeView from 'js/views/homeView';
import SongModel from 'js/models/songModel';
import SongsCollection from 'js/collections/songsCollection';
import 'songs/Black.mp3';
import 'songs/I\'ve Just Seen a Face.mp3';
import 'songs/Horizon\'s.mp3';

var Router = Backbone.Router.extend({
  routes: {
    ""       : "home"
  },

  currentView: null,
  songsCollection: null,

  initialize: function() {
    let song1 = new SongModel(songs[0]);
    let song2 = new SongModel(songs[1]);
    let song3 = new SongModel(songs[2]);
    this.songsCollection = new SongsCollection();
    this.songsCollection.add(song1);
    this.songsCollection.add(song2);
    this.songsCollection.add(song3);
  },

  home: function() {
    this.currentView = new HomeView({collection: this.songsCollection});
    this.currentView.render();
  }
});

var songs = [
  {
    id: 1,
    title: "Black",
    artist: "Pearl Jam",
    duration: 344
  },
  {
    id: 2,
    title: "I've Just Seen a Face",
    artist: "The Beatles",
    duration: 112
  },
  {
    id: 3,
    title: "Horizon's",
    artist: "Genesis",
    duration: 102
  }
];

export default Router;
