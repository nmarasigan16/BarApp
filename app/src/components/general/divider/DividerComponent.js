import React from 'react';
import { View, StyleSheet } from 'react-native';

let styles = {};

const Divider = ({ style }) =>
      <View style={[styles.container, style]} />;

styles = StyleSheet.create({
      container: {
              height: 1,
              backgroundColor: '#D3D3D3',
            },
});

export default Divider;
