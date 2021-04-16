import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export function WavyHeader() {
  return (
    <View style={styles.svgCurve}>
      <View style={{ backgroundColor: '#00c49a', height: 200 }}>
        <Svg
          height="70%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', top: 170 }}
        >
          <Path
            fill="#00c49a"
            d="M0,224L60,192C120,160,240,96,360,106.7C480,117,600,203,720,234.7C840,267,960,245,1080,202.7C1200,160,1320,96,1380,64L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  }
})


