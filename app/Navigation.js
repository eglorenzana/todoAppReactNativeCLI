


import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';



const Screen = () => {
  return (
        <View style={styles.container}>
          <Text>Imported screen!</Text>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Screen;