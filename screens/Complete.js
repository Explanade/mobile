import React, { useEffect, useState } from 'react'
import { StyleSheet, StatusBar, Image, Dimensions, View, KeyboardAvoidingView, ImageBackground, Text, TextInput, SafeAreaView, ActivityIndicator } from 'react-native'
import { BlurView } from 'expo-blur'
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../config/client'
import { AsyncStorage } from 'react-native'
// import { completeBudget } from '../store/actions/completeBudget'

const { width, height } = Dimensions.get('window')


export default function BudgetForm(props) {

    const [budget, setBudget] = useState('')
    const [itinId, setItinId] = useState(null);
    const data = props.navigation.state.params.data

    useEffect(() => {
        setItinId(data.itinId);
    }, [])

    function submitBudget(budget) {
        AsyncStorage.getItem('Access-Token')
            .then(data => {
                data = JSON.parse(data)
                return axios({
                    url: `/itineraries/${itinId}`,
                    method: 'patch',
                    headers: { token: data.token },
                    data: {
                        budget
                    }
                })
            })
            .then(({ data }) => {
                props.navigation.goBack()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={{
                    width,
                    height: height + 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                source={{ uri: `https://images.unsplash.com/photo-1534329539061-64caeb388c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1481&q=80` }}
                source={{ uri: `https://images.unsplash.com/photo-1526315251174-de0107e28fb4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80` }}
                blurRadius={1}
                resizeMode={'cover'}
            >
                <View style={{
                    height: height + 30,
                    width,
                    backgroundColor: 'rgba(0,0,0, 0.2)',
                    position: "absolute",
                    zIndex: 0
                }}></View>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent={true}
                    networkActivityIndicatorVisible={true}
                ></StatusBar>
                <Text style={styles.explanade}>thank you for using</Text>
                <Text style={{ ...styles.explanade, marginTop: 0 }}>explanade</Text>
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
                            <Text
                                style={{
                                    ...styles.input,
                                    fontSize: 12,
                                    fontFamily: "Quicksand-Medium",
                                    marginTop: 50,
                                    letterSpacing: 8,
                                    textTransform: "uppercase"
                                }}
                            >Itinerary</Text>
                            <Text style={styles.logo}> Complete!</Text>
                            <Text
                                style={{
                                    ...styles.input,
                                    fontSize: 14,
                                    fontFamily: "Quicksand-Medium",
                                    marginBottom: 50,
                                }}
                            >set your total budget here</Text>
                            <Text style={styles.label}>total budget : </Text>
                            <BlurView tint="dark" intensity={90} style={styles.blur}>
                                <Image
                                    source={require('../assets/icons8-us-dollar-30.png')}
                                    style={styles.ImageStyle} />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(value) => setBudget(value)}
                                    value={budget}
                                    type={'budget'}
                                    blurOnSubmit={true}
                                    keyboardType={'numeric'}
                                    keyboardAppearance='light'
                                    underlineColorAndroid='transparent'
                                // placeholder={' $ ITINERARY BUDGET'}
                                // placeholderStyle={{ ...styles.label }}
                                />
                            </BlurView>

                            <TouchableHighlight
                                style={{
                                    ...styles.input,
                                    backgroundColor: 'rgba(242,180,30, 0.85)',
                                    paddingHorizontal: 10,
                                    marginTop: 33,
                                    width: '70%',
                                    bottom: 0
                                }}
                                onPress={() => submitBudget(budget)}
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
                                }}>SUBMIT</Text>
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
    ImageStyle: {
        padding: 10,
        marginTop: -5,
        left: 20,
        height: 30,
        width: 30,
        zIndex: 100,
        resizeMode: 'stretch',
        alignItems: 'flex-start',
        justifyContent: "flex-start",
        position: "absolute"
    },
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
        marginVertical: 0,
        // marginVertical: 50,
        // marginBottom: 5,
        fontSize: 70,
        fontFamily: 'Brittanian',
    },

})