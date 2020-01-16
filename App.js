import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import SolarSwitch from './SolarSwitch';

export default function App() {
  const [value, setValue] = React.useState(true);
  return (
    <View style={styles.container}>
      <SolarSwitch value={value} onChange={() => setValue(!value)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
