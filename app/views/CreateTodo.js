import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import TodoForm from '../components/TodoForm';
import ItemShape from '../shapes/itemShape';
import { todoDateCategoryKeys, initialPropsForKeys } from '../utils/todoListUtils';
import { saveNewItem } from '../utils/todoStorage';


export const DATE_KEY_PROP = 'dateKey';
export const SCREEN_NAME = 'CreateTodo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  }
});

const CreateTodo = function(props) {
  let message = '';
  let hasError = false;
  function handleSaveTodo(item) {
    if (saveNewItem(item)) {
      message = 'Saved';
    } else {
      message = 'Error while saving';
      hasError = true;
    }
  }
  const dateKey = props.dateKey; // this should come from navigation params: props.navigation.params.dateKey
  return (
    <View style={styles.container} >
      <TodoForm
        initialAttributes={initialPropsForKeys[dateKey]}
        onSave={handleSaveTodo}
        message={message}
        hasError={hasError}
      />
    </View>
  );
}

CreateTodo.propTypes = {
  dateKey: PropTypes.oneOf(todoDateCategoryKeys)
};

CreateTodo.navigationOptions = {
  title: 'Create Todo',
};

export default CreateTodo;


export function CreateTodoScreen(props) { // this is connected with a navigator
  const dateKey = props.navigator.getParam(DATE_KEY_PROP, 'today');
  return (<CreateTodo {...props} dateKey={dateKey} />)
}
