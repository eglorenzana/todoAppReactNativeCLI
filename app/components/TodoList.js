import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import Todo from './Todo';



const styles = StyleSheet.create({
  container: {

  }
});

const keyExtractor = function(item, index) {
  return item.id;
}

export default function TodoList(props) {
  return (
    <View style={styles.container} >
      <FlatList
        data={props.items}
        renderItem={Todo}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};
