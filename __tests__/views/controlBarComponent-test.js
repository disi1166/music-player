import ControlBarComponent from '../../src/js/views/controlBarComponent';
import SongModel from '../../src/js/models/songModel';

describe('SongComponent', () => {
  let controlBarComponent;
  let songModel;
  beforeEach(() => {
    songModel = new SongModel({id: 1, duration: 300});
    controlBarComponent = new ControlBarComponent({model: songModel});
    controlBarComponent.songTotalPauseTime = 0;
  });

  it('should remove current model on stopSong', () => {
    spyOn(controlBarComponent, 'trigger');

    controlBarComponent.stopSong();

    expect(songModel.get('title')).toBe("");
  });
});
