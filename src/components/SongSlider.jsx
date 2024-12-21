import Slider from '@react-native-community/slider';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useProgress} from 'react-native-track-player';

const SongSlider = () => {
  const {position, duration} = useProgress();

  return (
    <View>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor="#fff"
        maximumTrackTintColor="#fff"
        style={styles.sliderContainer}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>
          {new Date(position * 1000).toISOString().substring(15, 19)}
        </Text>
        <Text style={styles.time}>
          {new Date(duration - position * 1000).toISOString().substring(15, 19)}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 5,
  },
  time: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default SongSlider;
