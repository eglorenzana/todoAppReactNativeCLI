import React from 'react'
import { FloatingAction } from 'react-native-floating-action';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MDIcon from 'react-native-vector-icons/MaterialDesign';

import { actionsForMainFAB } from '../utils/todoListUtils';
import { DATE_KEY_PROP, SCREEN_NAME } from '../utils/CreateTodo'

const actions = actionsForMainFAB.map((action) => {
  const { iconName, material, ...rest } = action;
  const Icon = material ? MDIcon : FAIcon;
  return {
    ...rest,
    icon: <Icon name={iconName} />
  };
});

export default function CreateTodoFAB(props) {
  const navigateToCreate = function(params = {}) {
    props.navigation.navigate(SCREEN_NAME, params);
  }

  const handleSelectAction = function(actionName) {
    navigateToCreate({ [DATE_KEY_PROP]: actionName });
  }

  return (
    <FloatingAction
      actions={actions}
      onPressItem={handleSelectAction}
    />
  );
}
