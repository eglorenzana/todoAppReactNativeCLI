import * as storage from './storage';

const TODO_LIST_KEY ='TODO_LIST_STORAGE_KEY';
const DEFAULT_TODO_LIST = [];

function generateId(todoList) {
    return Math.max(...todoList.map(todo => todo.id)) + 1;
}

export function saveNewItem(item = {}) {
    const todoList = getTodoList();
    const newItem = { ...item, id: generateId(todoList) };
    todoList.push(newItem);
    return storage.saveItem(TODO_LIST_KEY, todoList);
}

export function updateItem(item) {
    const todoList = getTodoList();
    const index = todoList.findIndex(todo => todo.id === item.id);
    todoList[index] = { ...todoList[index], ...item };
    return storage.saveItem(TODO_LIST_KEY, todoList);
}

export function deleteItem(item) {
    const todoList = getTodoList();
    const index = todoList.findIndex(todo => todo.id === item.id);
    todoList.splice(index, 1);
    if (todoList.length)
        return storage.saveItem(TODO_LIST_KEY, todoList);
    return storage.removeItem(TODO_LIST_KEY);
}

export function getTodoList() {
    return storage.getItem(TODO_LIST_KEY) || DEFAULT_TODO_LIST;
}
