import React from 'react';
import PropTypes from 'prop-types';
import { View , Button, StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';

import ItemShape from '../shapes/itemShape';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  fieldsContainer: {

  },
  optionsContainer: {

  },
});


export default class TodoForm extends React.Component {
  static propTypes = {
      initialAttributes: PropTypes.shape(ItemShape),
      onSave: PropTypes.func.isRequired,
      message: PropTypes.string,
      hasError: PropTypes.bool,
  }

  static defaultProperties = {
    message: '',
    hasError: false,
    initialAttributes: {}
  }

  constructor(props) {
    super(props);
    const {
      title = '',
      description = '',
      date,
    } = this.props.initialAttributes;
    this.state = {
      title,
      description,
      date,
      completed: false,
    }
  }

  handleSave = () => {
    const { title, description, date, completed } = this.state;
    this.props.onSave({
      title, description, date, completed
    });
  }

  handleChangeTitle = (title) => {
    this.setState({ title });
  }

  handleChangeDescription = (description) => {
    this.setState({ description });
  }

  render() {

    return (
      <View style={styles.container} >
        <View style={styles.fieldsContainer} >
          <TextField
            label="Title"
            value={this.state.title}
            onChangeText={this.handleChangeTitle}
          />
          <TextField
            label="Description"
            value={this.state.description}
            onChangeText={this.handleChangeDescription}
            multiline
          />
        </View>
        <View style={styles.optionsContainer} >
          <Button
            title="Save"
            accessibilityLabel="Save the todo"
            onPress={this.handleSave}
          />
        </View>
      </View>
    );
  }
}
