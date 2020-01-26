import React, { useEffect, useState } from 'react';
import Navigation from './Navigation'
import { Image, View, StyleSheet } from 'react-native'; ''
import * as Font from 'expo-font';


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

  if (fontLoaded) {
    return (
      <View style={styles.container}>
        <Navigation />
      </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
