


import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import { TodoMainFactory } from './views/Main';
import { CreateTodoScreen, SCREEN_NAME } from './views/CreateTodo';
import { menuItemsKeys } from './utils/todoListUtils';
import { DrawerNavigatorConfig } from './components/Drawer';




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