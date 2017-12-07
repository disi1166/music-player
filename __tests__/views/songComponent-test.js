import SongComponent from '../../src/js/views/songComponent';
import SongModel from '../../src/js/models/songModel';

describe('SongComponent', () => {
  let songComponent;
  let songModel;
  beforeEach(() => {
    songModel = new SongModel();
    songComponent = new SongComponent({model: songModel});
  });

  it('should update its class on playSong', () => {

    songComponent.playSong();

    expect(songComponent.el.className).toBe('song song--selected song--playing');
  });

  it('should update its class on pauseSong', () => {
    songModel.set('playing', false);
    songComponent.el.className = "song song--selected song--playing";

    songComponent.pauseSong();

    expect(songComponent.el.className).toBe('song song--selected');
  });

  it('should update its class on stopSong', () => {
    songModel.set('playing', false);
    songComponent.el.className = "song song--selected song--playing";

    songComponent.stopSong();

    expect(songComponent.el.className).toBe('song');
  });
});
