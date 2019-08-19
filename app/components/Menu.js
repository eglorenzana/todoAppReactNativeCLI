import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MaterialMenu, { MenuItem, MenuDivider } from 'react-native-material-menu';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {

  },
  activeItem: {

  }
});


export default class Menu extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
    })),
    onSelectItem: PropTypes.func.isRequired,
    triggerRenderer: PropTypes.element,
    itemRenderer: PropTypes.func,
    activeKey: PropTypes.string,
  }

  static defaultProps = {
    triggerRenderer: (<Text>Show menu</Text>),
    itemRenderer: (item) => item.label
  }

  constructor(props) {
    super(props);
    this.menu = null;
    this.buttonForMenu = React.cloneElement(this.props.triggerRenderer, {
      onPress: this.showMenu,
    })
  }

  setMenuRef = ref => {
    this.menu = ref;
  };

  hideMenu = () => {
    this.menu.hide();
  };

  showMenu = () => {
    this.menu.show();
  };

  handlePressItem = (key) => {
    this.props.onSelectItem(key);
    this.hideMenu();
  }

  isItemActive = (item) => {
      return item.key === this.props.activeKey;
  }

  render() {
    const ButtonForMenu = this.buttonForMenu;
    return (
      <View style={styles.container}>
        <MaterialMenu
          ref={this.setMenuRef}
          button={<ButtonForMenu />}
        >
          {
            this.props.items.map(item => {
              const styles = {
                ...styles.menuItem,
                ...(isItemActive(item) ? styles.activeItem : {})
              };
              return (
                <MenuItem
                  key={item.key}
                  onPress={()=> this.handlePressItem(item.key)}
                  styles={styles}
                >
                  {this.props.itemRenderer(item)}
                </MenuItem>
              );
            })
          }
        </MaterialMenu>
      </View>
    );
  }
}
