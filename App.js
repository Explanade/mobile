import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux'
import store from './store/store'
import Navigation from './Navigation'
import { Image, View, StyleSheet, Dimensions } from 'react-native'; ''
import * as Font from 'expo-font';
const { width, height } = Dimensions.get('window')


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Tahu': require('./assets/fonts/Tahu!.ttf'),
      'Brittanian': require('./assets/fonts/Brittanian.ttf'),
      'Cantika': require('./assets/fonts/Cantika.ttf'),
      'Lionthine': require('./assets/fonts/Lionthine.ttf'),
      'Wonderkids': require('./assets/fonts/Wonderkids.ttf'),
      'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf')
    })
      .then(() => {
        setFontLoaded(true);
      })
  }, [])

  useEffect(() => {
    AsyncStorage.removeItem('Access-Token')
    AsyncStorage.getItem('Access-Token')
      .then(data => {
        console.log(data, "------------------")
        if (data) {
          store.dispatch({
            type: 'SET_USER_SESSION',
            data: JSON.parse(data)
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  if (fontLoaded) {
    return (
      <Provider store={store}>
        <Navigation style={styles.container} />
      </Provider>
    )
  }
  else {
    return (
      <View style={styles.loading}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: 'https://succulents.qodeinteractive.com/wp-content/themes/succulents/assets/img/succulents-loader.gif' }}
        ></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
