import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Track} from 'react-native-track-player';

type songInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

const Songinfo = ({track}: songInfoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{track?.title}</Text>
      <Text style={styles.name}>{track?.artist}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
});

export default Songinfo;
