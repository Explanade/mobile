import { AsyncStorage } from 'react-native';

export const setAccessToken = async (token) => {
    try {
      await AsyncStorage.setItem('Access-Token', token);
    } catch (error) {
        console.log(error)
    }
};