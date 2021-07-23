import AsyncStorage from '@react-native-async-storage/async-storage';

type Keys = '@accordionExpandedId' | '@userNameDone' | '@tutorialDone';

const storeData = async (key: Keys, value: string): Promise<void | false> => {
  try {
    const jsonValue = JSON.stringify(value);
    await new Promise<void>((resolve) =>
      resolve(AsyncStorage.setItem(key, jsonValue)),
    );
  } catch (error) {
    console.warn('ERROR storeData', error);
    return false;
  }
};

const getData = async (key: Keys): Promise<string | undefined> => {
  try {
    const jsonValue = await new Promise<string | null>((resolve) =>
      resolve(AsyncStorage.getItem(key)),
    );

    return jsonValue != null ? jsonValue : undefined;
  } catch (error) {
    console.warn('ERROR getData', error);
    return undefined;
    // error reading value
  }
};

const removeItem = async (key: Keys): Promise<void | false> => {
  try {
    await new Promise<void>((resolve) => resolve(AsyncStorage.removeItem(key)));
  } catch (error) {
    console.warn('ERROR removeItem', error);
    return false;
  }
};

export {storeData, getData, removeItem};
