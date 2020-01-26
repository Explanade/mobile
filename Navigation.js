import React from 'react'
import { Image, StatusBar, TouchableOpacity, View } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import LandingPage from './screens/LandingPage'
import LoginPage from './screens/LoginPage'
import Profile from './screens/Profile'
import Itinerary from './screens/Itinerary'


const MainNavigation = createSwitchNavigator({
    LandingPage: { screen: LandingPage },
    LoginPage: { screen: LoginPage },
    Profile: { screen: Profile },
    Itinerary: { screen: Itinerary }
}, {
    initialRouteName: 'LandingPage',
    defaultNavigationOptions: {
    },
    headerStyle: {
        backgroundColor: 'black'
    }
})


export default createAppContainer(MainNavigation)