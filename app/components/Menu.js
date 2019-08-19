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
      onPress: this.showMenu.bind(this),
    });
    this.setMenuRef = this.setMenuRef.bind(this);
  }

  setMenuRef(ref){
    this.menu = ref;
  };
  
  showMenu() {
    this.menu.show();
  };
  
  hideMenu = () => {
    this.menu.hide();
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
          button={ButtonForMenu}
        >
          {
            this.props.items.map(item => {
              const style = {
                ...styles.menuItem,
                ...(this.isItemActive(item) ? styles.activeItem : {})
              };
              return (
                <MenuItem
                  key={item.key}
                  onPress={()=> this.handlePressItem(item.key)}
                  styles={style}
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
