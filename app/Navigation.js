import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import { TodoMainFactory } from './views/Main';
import { CreateTodoScreen, SCREEN_NAME } from './views/CreateTodo';
import { menuItemsKeys } from './utils/todoListUtils';
import { DrawerNavigatorConfig } from './components/Drawer';



const Stacks = {}
menuItemsKeys.forEach(key => {
  const MainScreen = TodoMainFactory(key);
  Stacks[key] = createStackNavigator({ // in this way, we can provide the back behaviour easily
    TodoMain: MainScreen,
    [SCREEN_NAME]: CreateTodoScreen,
  }, {
    initialRouteName: 'TodoMain',
  });
});


const DrawerRoutes = Object.freeze({
  today: Stacks.today,
  tomorrow: Stacks.tomorrow,
  someday: Stacks.someday,
  completed: Stacks.completed,
});

const DrawerNavigator = createDrawerNavigator(DrawerRoutes, {
  ...DrawerNavigatorConfig,
  initialRouteName: 'today',
});

const AppNavigation = createAppContainer(DrawerNavigator);
export default AppNavigation;
