import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


function GradientBackground({ children }) {
  return (
    <LinearGradient
      colors={['#9eafad', '#063970']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.background}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center"
  },
});

export default GradientBackground;

