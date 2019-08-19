import * as storage from './storage';

const TODO_LIST_KEY ='TODO_LIST_STORAGE_KEY';
const DEFAULT_TODO_LIST = [];

function generateId(todoList) {
    return Math.max(...todoList.map(todo => todo.id)) + 1;
}

export async function saveNewItem(item = {}) {
    const todoList = await getTodoList();
    const newItem = { ...item, id: generateId(todoList) };
    todoList.push(newItem);
    return storage.saveItem(TODO_LIST_KEY, todoList);
}

export async function updateItem(item) {
    const todoList = await getTodoList();
    const index = todoList.findIndex(todo => todo.id === item.id);
    todoList[index] = { ...todoList[index], ...item };
    return storage.saveItem(TODO_LIST_KEY, todoList);
}

export async function deleteItem(item) {
    const todoList = await getTodoList();
    const index = todoList.findIndex(todo => todo.id === item.id);
    todoList.splice(index, 1);
    if (todoList.length)
        return storage.saveItem(TODO_LIST_KEY, todoList);
    return storage.removeItem(TODO_LIST_KEY);
}

export async function getTodoList() {
    const list = await storage.getItem(TODO_LIST_KEY);
    return list || DEFAULT_TODO_LIST;
}
