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

  }
});

const CreateTodo = function(props) {
  let message = '';
  let hasError = false;
  function handleSaveTodo(item) {
    saveNewItem(item).then((saved) => {
      if (saved) {
        message = 'Saved';
        props.navigation.navigate('TodoMain');
      } else {
        message = 'Error while saving';
        hasError = true;
      }
      // show message with a Toast or something like that
    })

  }
  const dateKey = props.dateKey;
  return (
    <View style={styles.container} >
      <TodoForm
        initialAttributes={initialPropsForKeys[dateKey]}
        onSave={handleSaveTodo}
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
  const dateKey = props.navigation.getParam(DATE_KEY_PROP, 'today');
  return (<CreateTodo {...props} dateKey={dateKey} />)
}
