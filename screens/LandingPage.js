import React, { useEffect } from 'react'
import { View, Image, Dimensions, ImageBackground } from 'react-native'
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
    <ImageBackground
      // source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/94517f88315503.5dd2e6299da36.jpg' }}
      source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/89aaa273358257.5c06e39a6407e.jpg' }}
      style={{ height: height + 30, width }} blurRadius={0}>
      <View style={{
        height: height + 30,
        width,
        backgroundColor: 'rgba(0,0,0, 0.3)',
        position: "absolute",
        zIndex: 0
      }}></View>
      <Image
        source={require('../assets/explanade-travel-plan-enjoy.gif')}
        style={{
          top: 100,
          width: width - 20,
          height: height / 4,
          zIndex: 100
        }}
      ></Image>
      <Text style={{
        textAlign: "center",
        padding: 4,
        marginTop: 100,
        paddingLeft: 8,
        color: 'white',
        letterSpacing: 3,
        marginHorizontal: 5,
        fontWeight: '600',
        fontSize: 12,
        zIndex: 10
      }}> EXPLANADE</Text>
      <Block center flex={0.3} >
        <Button style={{
          width: '35%',
          // borderRadius: 12,
          backgroundColor: 'rgba(255,255,255,0.3)',
          top: 250,
        }}
          onPress={() => props.navigation.navigate('LoginPage')}>
          <Text center h5 style={{
            color: 'white',
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            fontWeight: 'bold',
            letterSpacing: 3,
            fontFamily: 'Poppins-SemiBold',
            textShadowColor: 'black',
            textShadowOffset: { height: 3 },
            textShadowRadius: 8,
          }}>TAKE ME IN</Text>
        </Button>
      </Block>
    </ImageBackground>
  )
}

