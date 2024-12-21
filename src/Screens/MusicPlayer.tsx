import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {playListData} from '../constants';
import Songinfo from '../components/Songinfo';
import SongSlider from '../components/SongSlider';
import ControllerCenter from '../components/ControllerCenter';
import TrackPlayer, {
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {Event} from 'react-native-track-player';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackActiveTrackChanged:
        if (event.index !== undefined) {
          const playingTrack = await TrackPlayer.getTrack(event.index);
          setTrack(playingTrack);
        }
        break;
    }
  });

  const renderArtWork = () => {
    return (
      <View style={styles.listartworkWapper}>
        <View style={styles.container}>
          {track?.artwork && (
            <Image
              style={styles.albumArtImg}
              source={{uri: track?.artwork?.toString()}}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={playListData}
        renderItem={renderArtWork}
        keyExtractor={song => song.id.toString()}
      />

      <Songinfo track={track} />
      <SongSlider />
      <ControllerCenter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  listartworkWapper: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  albumArtImg: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  songInfoWrapper: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artistName: {
    fontSize: 14,
    color: '#bbbb',
  },
  controlsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: width * 0.8,
  },
  playButton: {
    width: 60,
    height: 60,
    backgroundColor: '#ff6347',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseButton: {
    width: 60,
    height: 60,
    backgroundColor: '#32cd32',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MusicPlayer;
