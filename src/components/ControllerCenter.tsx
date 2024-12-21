import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';

const ControllerCenter = () => {
  const playBackState = usePlaybackState();

  // Helper function to check if playBackState is a valid State
  const isStateValid = (state: any): state is State => {
    return Object.values(State).includes(state);
  };

  // Skip to the next track
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  // Skip to the previous track
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  // Toggle playback between play and pause
  const togglePlayback = async () => {
    if (!isStateValid(playBackState)) return;

    const currentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currentTrack !== null) {
      if (playBackState === State.Paused || playBackState === State.Ready) {
        await TrackPlayer.play();
      } else if (playBackState === State.Playing) {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Skip to previous */}
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="step-backward" size={40} />
      </Pressable>

      {/* Play/Pause toggle */}
      <Pressable onPress={togglePlayback}>
        <Icon
          style={styles.icon}
          name={
            isStateValid(playBackState) && playBackState === State.Playing
              ? 'pause'
              : 'play'
          }
          size={40}
        />
      </Pressable>

      {/* Skip to next */}
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="step-forward" size={40} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#121212',
  },
  icon: {
    color: '#ffffff',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#1e1e1e',
    textAlign: 'center',
  },
});

export default ControllerCenter;
