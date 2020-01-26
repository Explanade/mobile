import React, { useEffect, useState } from 'react'
import { StyleSheet, Dimensions, StatusBar, Text, SafeAreaView } from 'react-native'
import TextInput2 from './TextInput2'
import { BlurView } from 'expo-blur'
import { TouchableHighlight } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window')

export default LoginPage = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <SafeAreaView
            style={{
                zIndex: 10,
                position: 'absolute',
                width: 200,
                height,
                borderRadius: 20,
                marginHorizontal: '25%',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                maxHeight: 550,
                paddingHorizontal: 20
            }}>
            <Text style={styles.logo}> Welcome Back!</Text>
            {/* <Text style={styles.label}>email</Text> */}
            <BlurView tint="dark" intensity={90} style={styles.blur}>
                <TextInput2
                    style={styles.input}
                    onChangeText={(value) => setEmail(value)}
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
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                    blurOnSubmit={true}
                    type={'password'}
                    inlineImageLeft='search_icon'
                    numberOfLines={2}
                    secureTextEntry={true}
                    placeholder={'YOUR PASSWORD'}
                    placeholderStyle={{ ...styles.label }} />
            </BlurView>
            <TouchableHighlight
                style={{
                    width: width / 1.8,
                    borderRadius: 12,
                    backgroundColor: 'rgba(242,180,30, 0.85)',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    margin: 25,
                    marginTop: 33,
                    bottom: 0
                }}
                onPress={() => props.navigation.navigate('Itinerary')}
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    notBlurred: {
        ...StyleSheet.absoluteFill,
        top: StatusBar.currentHeight,
    },
    header: {
        color: 'white',
        fontSize: 15,
        marginVertical: '5%',
        fontWeight: 'bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
        textAlign: "center"
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
        width: 300,
        paddingLeft: 8,
        color: 'white',
        fontWeight: '800',
        margin: 30,
        marginTop: -100,
        marginBottom: 50,
        fontSize: 70,
        fontFamily: 'Brittanian',
        zIndex: 10
    },
})