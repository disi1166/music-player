import SongModel from '../../src/js/models/songModel';

describe('SongModel', () => {
  let songModel;
  beforeEach(() => {
    songModel = new SongModel(
      {
        title: "Black",
        artist: "Pearl Jam",
        duration: 300
      }
    );
    songModel.audioTrack = {play: function() {}, pause: function() {}}
    spyOn(songModel, 'trigger');
  });

  it('should be populated with the attributes from the input json', () => {
    expect(songModel.get('title')).toBe('Black');
    expect(songModel.get('artist')).toBe("Pearl Jam");
    expect(songModel.get('duration')).toBe(300);
    expect(songModel.get('formattedDuration')).toBe("5:00");
  });

  describe('on playSong', () => {
    it('should update itself and add pausedTime to totalPausedTime and trigger an event ', () => {
      songModel.pausedTime = 1000;
      songModel.songTotalPauseTime = 5000;
      spyOn(songModel, 'getCurrentTime').and.returnValue(11000);

      songModel.playSong();

      expect(songModel.get('playing')).toBeTruthy();
      expect(songModel.trigger).toHaveBeenCalledWith('playSong', songModel);
      expect(songModel.songTotalPauseTime).toBe(15000);
    });

    it('should not add pauseTime to totalPausedTime if pausedTime is not set', () => {
      songModel.playSong();

      expect(songModel.songTotalPauseTime).toBe(0);
    });
  });

  it('on pauseSong should update itself start counting pausedTime and trigger an event', () => {
    spyOn(songModel, 'getCurrentTime').and.returnValue(11000);
    songModel.set('playing', true);

    songModel.pauseSong();

    expect(songModel.get('playing')).toBeFalsy();
    expect(songModel.trigger).toHaveBeenCalledWith('pauseSong');
    expect(songModel.pausedTime).toBe(11000);
  });

  it('on stopSong should update itself and trigger an event', () => {
    songModel.set('playing', true);

    songModel.stopSong();

    expect(songModel.get('playing')).toBeFalsy();
    expect(songModel.trigger).toHaveBeenCalledWith('stopSong');
    expect(songModel.songTotalPauseTime).toBe(0);
    expect(songModel.pausedTime).toBeNull();
    expect(songModel.get('formattedRemainingTime')).toBe(songModel.get('formattedDuration'));
  });

  describe('function formatDuration', () => {
    it('should format the duration to "" string if duration is null', () => {
      expect(songModel.formatDuration(null)).toBe('');
    });

    it('should format the duration to 0:00 string if duration is 0', () => {
      expect(songModel.formatDuration(0)).toBe('0:00');
    });

    it('should format the duration in minutes and seconds', () => {
      expect(songModel.formatDuration(345)).toBe('5:45');
    });

    it('should format the duration in hours minutes and seconds', () => {
      expect(songModel.formatDuration(3662)).toBe('1:01:02');
    });
  });

  describe('when oneSecElapsed is called', () => {

    it('should update the remaining time, given song is playing', () => {
      songModel.set('playing', true);
      songModel.songStartTime = 5000;
      spyOn(songModel, 'getCurrentTime').and.returnValue(11006);

      songModel.oneSecElapsed();

      expect(songModel.get('formattedRemainingTime')).toBe('4:54');
    });

    it('should update the remaining time considering the time the song has been paused, given song is playing', () => {
      songModel.set('playing', true);
      songModel.songStartTime = 5000;
      songModel.songTotalPauseTime = 5000;
      spyOn(songModel, 'getCurrentTime').and.returnValue(11550);

      songModel.oneSecElapsed();

      expect(songModel.get('formattedRemainingTime')).toBe('4:58');
    });

    it('should not update the remaining time in the model given song is paused', () => {
      songModel.set('playing', false);
      songModel.songStartTime = 5000;
      spyOn(songModel, 'getCurrentTime').and.returnValue(11006);

      songModel.oneSecElapsed();

      expect(songModel.get('formattedRemainingTime')).toBe('5:00');
    });

    it('should stop the song and trigger event songFinished if the entire duration of the song has elapsed', () => {
      songModel.set('playing', true);
      songModel.songStartTime = 5000;
      songModel.songTotalPauseTime = 5000;
      spyOn(songModel, 'getCurrentTime').and.returnValue(311000);
      spyOn(songModel, 'stopSong');

      songModel.oneSecElapsed();

      expect(songModel.stopSong).toHaveBeenCalled();
      expect(songModel.trigger).toHaveBeenCalledWith('songFinished');
    });
  });
});
