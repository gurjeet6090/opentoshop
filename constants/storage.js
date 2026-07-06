import AsyncStorage from "@react-native-async-storage/async-storage";

const LANG_KEY = "APP_LANGUAGE";

export const saveLanguage = async (lang) => {
  await AsyncStorage.setItem(LANG_KEY, lang);
};

export const getLanguage = async () => {
  return await AsyncStorage.getItem(LANG_KEY);
};