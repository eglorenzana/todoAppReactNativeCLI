import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import TodoFilterMenu, { menuItemsKeys} from '../components/TodoFilterMenu';
import TodoList from '../components/TodoList';
import { getTodoList } from '../utils/todoStorage';
import { getFilterObjectForKey, filterTodoItems } from '../utils/todoListUtils';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  filterContainer: {

  },
  mainContainer: {

  },
});

export default class TodoListView extends React.Component {
  static propTypes = {
    initialFilterKey: PropTypes.oneOf(menuItemsKeys),
  }

  static navigationOptions = {
    title: 'Todos',
  };

  constructor(props) {
    super(props);
    this.state = {
      filterKey: this.props.initialFilterKey,
      items: []
    }
  }
  
  componentDidMount() {
    getTodoList().then((todoList) => {
      const filteredList = this.filterItems(todoList, this.props.initialFilterKey);
      this.setState({ items: filteredList})
    })
    
  }

  filterItems = (itemList, key) => {
      return filterTodoItems(itemList, getFilterObjectForKey(key));
  }

  handleOnChangeFilter = (key) => {
      this.props.navigation.navigate(key);
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.filterContainer}>
                <TodoFilterMenu
                    activeKey={this.state.filterKey}
                    onChangeFilter={this.handleOnChangeFilter}
                />
            </View>
            <View style={styles.mainContainer}>
                <TodoList items={this.state.items} />
            </View>
        </View>
    );
  }
}

export function TodoMainFactory(filterKey) {
  return function(props) {
    return (<TodoListView {...props} initialFilterKey={filterKey} />);
  };
}
