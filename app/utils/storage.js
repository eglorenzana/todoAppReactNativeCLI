import {AsyncStorage} from 'react-native';

async function saveItem(key, item) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(UID123_object));
    return true;
  } catch (error) {
    console.log('Error saving item', key, error);
  }
  return false;
};


async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log('Error getting item', key, error);
  }
  return undefined;
};


async function removeItem(key) {
    try {
        const value = await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
      console.log('Error deleting item', key, error);
    }
    return false;
}


export {
    saveItem,
    getItem,
    removeItem,
}
