import SongModel from '../../src/js/models/songModel';
import SongsCollections from '../../src/js/collections/songsCollection';

describe('SongsCollections', () => {
  let songsCollection;
  let songModel1;
  let songModel2;
  beforeEach(() => {
    songModel1 = new SongModel({id: 1, playing: true});
    songModel1.audioTrack = {play: function() {}, pause: function() {}}
    songModel2 = new SongModel({id: 2});
    songsCollection = new SongsCollections();
    songsCollection.add(songModel1);
    songsCollection.add(songModel2);
    songsCollection.selectedSongIndex = 0;
  });

  describe('when updateSelectedSong is called', () => {
    it('should unselect the currently selected song and update the selectedSongIndex', () => {
      songsCollection.updateSelectedSong(songModel2);

      expect(songModel1.get('playing')).toBeFalsy();
      expect(songsCollection.selectedSongIndex).toBe(1);
    });

    it('should do nothing if newly selected song is the currently selected one when updateSelectedSong is called', () => {
      songsCollection.updateSelectedSong(songModel1);

      expect(songModel1.get('playing')).toBeTruthy();
      expect(songModel2.get('playing')).toBeFalsy();
      expect(songsCollection.selectedSongIndex).toBe(0);
    });

    it('should only update the selectedSongIndex, given no song is being played', () => {
      songModel1.set('playing', false);

      songsCollection.selectedSongIndex = null;

      songsCollection.updateSelectedSong(songModel2);

      expect(songModel1.get('playing')).toBeFalsy();
      expect(songsCollection.selectedSongIndex).toBe(1);
    });
  });

  describe('when playNextSongIfAvailable is called', () => {
    it('should play next song, given next song exists', () => {
      spyOn(songModel2, 'playSong');

      songsCollection.playNextSongIfAvailable();

      expect(songsCollection.selectedSongIndex).toBe(1);
      expect(songModel2.playSong).toHaveBeenCalled();
    });

    it('should set selectedSongIndex to null, given next song does not exist', () => {
      songsCollection.selectedSongIndex = 1;
      spyOn(songModel1, 'playSong');

      songsCollection.playNextSongIfAvailable();

      expect(songsCollection.selectedSongIndex).toBe(null);
      expect(songModel1.playSong).not.toHaveBeenCalled();
    });
  });
});
