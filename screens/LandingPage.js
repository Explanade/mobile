import React, { useEffect } from 'react'
import { StyleSheet, Image, Dimensions } from 'react-native'
import { Button } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient';
import Block from '../components/Block'
import Text from '../components/Text';
import { useSelector } from 'react-redux'

export default function LandingPage(props) {

  const { width, height } = Dimensions.get('window')
  const { isLogin } = useSelector(state => state.loginAcc)

  useEffect(() => {
    if (isLogin) {
      props.navigation.navigate('Profile')
    }
  })

  return (
    <Block style={{ backgroundColor: '#eae5de' }} >
      <Block center end flex={0.3}>
        <Text h1 style={{ fontWeight: 'bold', color: '#a8cdee' }}>
          <Text h1 style={{ color: 'white' }}> Xplanade </Text>
        </Text>
      </Block>
      <Block flex={0.6} center middle>
        <Image
          style={{ width: width - 50, height: height / 2 }}
          resizeMode={'cover'}
          source={require('../assets/traveler.gif')}
        />
      </Block>
      <Block center flex={0.3} >
        <Button style={{
          width: '30%',
          borderRadius: 12,
          backgroundColor: 'white'
        }}
          onPress={() => props.navigation.navigate('LoginPage')}>
          <Text center h5 style={{
            color: '#154036',
            width: '100%',
            fontWeight: 'bold',
            letterSpacing: 2,
          }}>TAKE ME IN</Text>
        </Button>
      </Block>
    </Block >
  )
}

