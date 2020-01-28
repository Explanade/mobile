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
    // <Block style={{ backgroundColor: '#eae5de' }} >
    //   <Block center end flex={0.3}>
    //     <Text h1 style={{ fontWeight: 'bold', color: '#a8cdee' }}>
    //       <Text h1 style={{ color: 'white' }}> Xplanade </Text>
    //     </Text>
    //   </Block>
    //   <Block flex={0.6} center middle>
    //     <Image
    //       style={{ width: width - 50, height: height / 2 }}
    //       resizeMode={'cover'}
    //       source={require('../assets/traveler.gif')}
    //     />
    //   </Block>
    //   <Block center flex={0.3} >
    //     <Button style={{
    //       width: '30%',
    //       borderRadius: 12,
    //       backgroundColor: 'white'
    //     }}
    //       onPress={() => props.navigation.navigate('LoginPage')}>
    //       <Text center h5 style={{
    //         color: '#154036',
    //         width: '100%',
    //         fontWeight: 'bold',
    //         letterSpacing: 2,
    //       }}>TAKE ME IN</Text>
    //     </Button>
    //   </Block>
    // </Block >
    <ImageBackground
      // source={{ uri: 'https://media.theeverygirl.com/wp-content/uploads/2018/12/how-to-store-memories-and-photos.jpg' }}
      source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/94517f88315503.5dd2e6299da36.jpg' }}
      // source={{ uri: 'https://i.pinimg.com/564x/62/03/0d/62030d17484a2fa2c55250e24c1e3816.jpg' }}
      // source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/41d76958336221.59f88b937fb33.jpg' }}
      // source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/701c3e88044003.5dcebb5b7452a.jpg' }}
      style={{ height: height + 30, width }} blurRadius={0.5}>
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
      <Block center flex={0.3} >
        <Button style={{
          width: '30%',
          borderRadius: 12,
          backgroundColor: 'white',
          top: 500,
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
    </ImageBackground>
  )
}

