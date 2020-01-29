import React from 'react'
import { StatusBar, TouchableOpacity, View, Text } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { useDispatch } from 'react-redux'
import { createStackNavigator } from 'react-navigation-stack'
import { FontAwesome, MaterialCommunityIcons, FontAwesome5 } from 'react-native-vector-icons'
import { AsyncStorage } from 'react-native'



import LandingPage from './screens/LandingPage'
import LoginPage from './screens/LoginPage'
import Profile from './screens/Profile'
import Itinerary from './screens/Itinerary'
import MapView from './screens/MapView'
import Complete from './screens/Complete'



const HomeNavigator = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: () => ({
            header: ({ navigation }) => (
                <View
                    style={{
                        height: StatusBar.currentHeight + 70,
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        textAlign: 'right',
                        paddingHorizontal: 15,
                    }}>
                    <TouchableOpacity onPress={() => {
                        // const dispatch = useDispatch()
                        AsyncStorage.removeItem('Access-Token')
                        // dispatch({ type: "LOGOUT" })
                        navigation.navigate('LandingPage')
                    }
                    }>
                        <MaterialCommunityIcons name={'logout'} style={{ color: '#2b2d39', fontSize: 30, marginRight: 20, textAlign: 'right' }} />
                    </TouchableOpacity>
                </View>
            ),
            headerTransparent: true
        }),
    },
    Itinerary: {
        screen: Itinerary,
        navigationOptions: () => ({
            header: ({ navigation }) => (

                <View style={{
                    height: StatusBar.currentHeight + 70,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    paddingHorizontal: 15,
                }}>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 30, paddingTop: 40 }}>
                            <FontAwesome5 name={'chevron-left'} style={{ fontSize: 20, color: 'goldenrod' }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Complete', { data: { itinId: navigation.state.params.data.itinId } })}
                        style={{
                            paddingHorizontal: 25,
                            paddingLeft: 30,
                            paddingTop: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 10
                        }}
                    >
                        <FontAwesome name={'dollar'}
                            style={{
                                fontSize: 20,
                                color: 'white',
                                borderRadius: 50,
                                width: 30, height: 30,
                                backgroundColor: "goldenrod",
                                textAlign: "center",
                                paddingTop: 5,
                            }} />
                    </TouchableOpacity>
                </View >
            ),
            headerTransparent: true
        })
    }, Complete: {
        screen: Complete,
        navigationOptions: () => ({
            header: ({ navigation }) => (
                <View style={{
                    height: StatusBar.currentHeight + 70,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    paddingHorizontal: 15,
                }}>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 30, paddingTop: 40 }}>
                            <FontAwesome5 name={'chevron-left'} style={{ fontSize: 20, color: 'goldenrod' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            ),
            headerTransparent: true
        })
    },
    MapView: {
        screen: MapView,
        navigationOptions: () => ({
            header: ({ navigation }) => (
                <View style={{
                    height: StatusBar.currentHeight + 70,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    paddingHorizontal: 15,
                }}>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 30, paddingTop: 45 }}>
                            <FontAwesome5 name={'chevron-left'} style={{
                                fontSize: 20, color: 'black', textShadowColor: '#f2b41e',
                                textShadowOffset: { height: 3 },
                                textShadowRadius: 8,
                            }} />
                        </TouchableOpacity>
                        <Text
                            style={{
                                paddingTop: 28,
                                marginVertical: 5,
                                paddingLeft: 5,
                                color: 'black',
                                letterSpacing: 3,
                                marginHorizontal: 5,
                                fontWeight: '600',
                                fontSize: 25,
                                textTransform: "uppercase",
                                fontFamily: 'Poppins-SemiBold',
                                textShadowColor: '#f2b41e',
                                textShadowOffset: { height: 3 },
                                textShadowRadius: 8,
                            }}
                        > explore </Text>
                    </View>
                </View>
            ),
            headerTransparent: true,


        })
    }
}, {
    initialRouteName: 'Profile',
    headerBackTitle: null,
    headerBackImage: () => {
        return (
            <FontAwesome5 name={'arrow-left'} size={15} color={'#FFFF'} />
        )
    }
});

const MainNavigation = createSwitchNavigator({
    LandingPage: { screen: LandingPage },
    LoginPage: { screen: LoginPage },
    HomeNavigator: { screen: HomeNavigator },
    Itinerary: { screen: Itinerary },
}, {
    initialRouteName: 'LandingPage',
    defaultNavigationOptions: {
    },
    headerStyle: {
        backgroundColor: 'black'
    }
})


export default createAppContainer(MainNavigation)