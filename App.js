/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import AppNavigation from './app/Navigation';

const App = () => {
  return (
    <Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <Text>Edited initial screen!</Text>
          <AppNavigation />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;
