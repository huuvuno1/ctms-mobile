import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('getData error', e)
  }
}

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log('storeData error', e)
  }
}

export const KEY = {
  USER_INFO: 'USER_INFO',
  SCORE: 'SCORE',
  CLASS_SCHEDULE: 'CLASS_SCHEDULE',
  EXAM_SCHEDULE: 'EXAM_SCHEDULE',
  TUITION_BILL: 'TUITITION_BILL'
}

export const repository = {
  getData,
  storeData
}