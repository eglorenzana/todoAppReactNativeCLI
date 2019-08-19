import  { dayTimeRange, filterByDateRange, isDateInRange } from './dates';

const todoDateCategories = [
  { key: 'today', label: 'Today' },
  { key: 'tomorrow', label: 'Tomorrow' },
  { key: 'someday', label: 'Some Day' },
];

const todoCategories = [
  ...todoDateCategories,
  { key: 'completed', label: 'Completed' }
];

export const todoDateCategoryKeys = todoDateCategories.map(todo => todo.key);

export const menuItemsKeys = todoCategories.map(todo => todo.key);

export const menuItems = [ ...todoCategories ];

const todoCategoriesObject = {};
todoCategories.forEach(todo => {
  todoCategoriesObject[todo.key] = todo;
} );

export const initialPropsForKeys = Object.freeze({
  today: {
    date: new Date(),
    title: todoCategoriesObject.today.label
  },
  tomorrow: {
    date: dayTimeRange(new Date(), 1).dateBase,
    title: todoCategoriesObject.tomorrow.label
  },
  someday: {

  },
});


const filterPropertiesGetter = Object.freeze({
  today: function() {
    const today = new Date();
    return dayTimeRange(today);
  },
  tomorrow: function() {
    const today = new Date();
    return dayTimeRange(today, 1);
  },
  someday: function() {
    const today = new Date();
    const someDay = dayTimeRange(today, 2);
    return {
      startDate: someDay.startDate,
      endDate: undefined
    };
  },
  completed: function() {
    const today = new Date();
    const todayRange = dayTimeRange(today);
    return {
      completed: true,
      endDate: todayRange.startDate,
      startDate: undefined,
    }
  },
});

export function getFilterObjectForKey(key) {
    const getter = filterPropertiesGetter[key];
    return (getter && getter()) || {};
}

function compareCompleted(completedValue) {
    if (completedValue === undefined ) {
        return function(){ return true; };
    }
    return function(todo) {
        return completedValue === todo.completed;
    }
}


function filterTodos(list, startDate, endDate, others = {}) {
    const completeFilter = compareCompleted(others.completed);
    return list.filter(todo => {
        return (
            completeFilter(todo) &&
            isDateInRange(todo.date, startDate, endDate)
        );
    })
}

export function filterTodoItems(list, filterObject = {}) {
    const {
        startDate,
        endDate,
        ...others
    } = filterObject;
    const filter = Object.keys(others).length ? filterTodos : filterByDateRange;
    return filter(list, startDate, endDate, others);
}

const actionsAttributes = {
  today: {
    position: 3,
    iconName: 'today',
    material: true,
  },
  tomorrow: {
    position: 2,
    iconName: 'calendar-today',
    material: true,
  },
  someday: {
    position: 1,
    iconName: 'date-range',
    material: true,
  }
}

export const actionsForMainFAB = todoDateCategoryKeys.map((key, index) => ({
  ...actionsAttributes[key],
  name: key,
  text: todoDateCategories[index].label,
}));
