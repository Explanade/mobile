import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, StatusBar, Dimensions, View, KeyboardAvoidingView, ImageBackground, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import TextInput2 from '../components/TextInput2'
import { BlurView } from 'expo-blur'
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/actions/postLogin'

const { width, height } = Dimensions.get('window')


export default function LoginPage(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [timePassed, setTimePassed] = useState(false)
    const dispatch = useDispatch()
    const { isLogin, message } = useSelector(state => state.loginAcc)
    const [msg, setMsg] = useState('')


    function goLogin(email, password) {
        let payload = {
            email,
            password,
        }
        dispatch(login(payload))
    }
    useEffect(() => {
        if (isLogin) {
            props.navigation.navigate('Profile')
        } else {
            setMsg('')
        }
    }, [isLogin])

    useEffect(() => {
        setMsg(message)
    }, [message])

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={{
                    width,
                    height: height + 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                source={{ uri: `https://images.unsplash.com/photo-1543637005-4d639a4e16de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60` }}
                blurRadius={1}
                resizeMode={'cover'}
            >
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent={true}
                    networkActivityIndicatorVisible={true}
                ></StatusBar>

                <Text style={styles.explanade}>explanade</Text>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >
                    <SafeAreaView
                        style={{
                            position: 'relative',
                            borderRadius: 20,
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 20
                        }}>
                        <View style={{
                            width: 250,
                            alignItems: "center",
                            justifyContent: "center",
                            marginVertical: 50,
                        }}>
                            <Image
                                style={{
                                    width: width / 1.5,
                                    height: height / 5,
                                    zIndex: 100,
                                    marginVertical: 30
                                }}
                                source={require('../assets/welcomeback-gif.gif')} />
                            {/* <Text style={styles.logo}> Welcome Back!</Text> */}
                            <BlurView tint="dark" intensity={90} style={styles.blur}>
                                <TextInput2
                                    style={styles.input}
                                    onChangeText={(value) => {
                                        setEmail(value)
                                        setMsg('')
                                    }}
                                    value={email}
                                    type={'email'}
                                    inlineImageLeft='search_icon'
                                    blurOnSubmit={true}
                                    keyboardType={'email-address'}
                                    placeholder={'YOUR EMAIL'}
                                    placeholderStyle={{ ...styles.label }}
                                />
                            </BlurView>
                            {/* <Text style={styles.label}>password</Text> */}
                            <BlurView tint="dark" intensity={90} style={styles.blur}>
                                <TextInput2
                                    style={styles.input}
                                    onChangeText={(value) => {
                                        setPassword(value)
                                        setMsg('')
                                    }}
                                    value={password}
                                    blurOnSubmit={true}
                                    type={'password'}
                                    inlineImageLeft='search_icon'
                                    numberOfLines={2}
                                    secureTextEntry={true}
                                    placeholder={'YOUR PASSWORD'}
                                    placeholderStyle={{ ...styles.label }} />
                            </BlurView>
                            {

                                msg
                                    ? <Text
                                        style={{
                                            color: "red",
                                            marginTop: 10,
                                            marginBottom: 0,
                                            fontSize: 10,
                                            textAlign: "center",
                                            fontFamily: "Quicksand-Medium",
                                            fontWeight: '600'
                                        }}> {msg}</Text>
                                    : <Text>  </Text>
                            }
                            <TouchableHighlight
                                style={{
                                    ...styles.input,
                                    // borderRadius: 12,
                                    backgroundColor: 'rgba(242,180,30, 0.85)',
                                    // paddingVertical: 17,
                                    paddingHorizontal: 10,
                                    // margin: 25,
                                    marginTop: 20,
                                    bottom: 0
                                }}
                                onPress={() => goLogin(email, password)}
                            // onPress={() => props.navigation.navigate('Profile')}
                            >
                                <Text style={{
                                    textAlign: 'center',
                                    color: 'white',
                                    paddingTop: -50,
                                    paddingBottom: -50,
                                    width: '100%',
                                    fontWeight: 'bold',
                                    letterSpacing: 2,
                                    fontSize: 12
                                }}>LOGIN</Text>
                            </TouchableHighlight>
                        </View>
                    </SafeAreaView>
                    <View style={{ height: height / 3.3 }} />
                </KeyboardAvoidingView>

            </ImageBackground >
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    explanade: {
        padding: 4,
        marginTop: 100,
        paddingLeft: 8,
        color: 'white',
        letterSpacing: 3,
        marginHorizontal: 5,
        fontWeight: '600',
        fontSize: 12,
        zIndex: 10
    },
    label: {
        width: '100%',
        color: 'white',
        fontSize: 11,
        letterSpacing: 2,
        textTransform: 'uppercase',
        textAlign: "center",
        width: width / 1.8,
        fontFamily: 'Poppins-Medium',
    },
    blur: {
        borderRadius: 12,
        marginTop: 15,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderColor: '#84cefe',
        padding: 5,
        width: width / 1.8,
        color: 'white',
        fontSize: 12,
        // borderWidth: 1,
        borderRadius: 12,
        textAlign: 'center',
    },
    logo: {
        textAlign: 'center',
        width: 250,
        color: 'white',
        fontWeight: '800',
        marginVertical: 50,
        fontSize: 70,
        fontFamily: 'Brittanian',
    },

})