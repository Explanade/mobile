import React, { useEffect, useState } from 'react'
import { StyleSheet, StatusBar, Dimensions, View, ImageBackground, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import FormLogin from '../components/FormLogin'

export default function LoginPage(props) {


    const [backdropLoaded, setBackdropLoaded] = useState(false)
    const { width, height } = Dimensions.get('window')


    const styles = StyleSheet.create({
        container: {
            height,
            flex: 1,
        },
        logo: {
            padding: 4,
            marginTop: 5,
            paddingLeft: 8,
            color: 'white',
            letterSpacing: 3,
            marginHorizontal: 5,
            fontWeight: '600',
            fontSize: 12,
            zIndex: 10
        },
        bar: {
            width: '100%',
            justifyContent: 'flex-start',
            paddingRight: 50,
            height: 40,
            backgroundColor: 'white',
            resizeMode: 'contain',
            marginBottom: 20
        },
        loading: {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: "center",
            alignItems: "center",
        }
    })

    return (
        <SafeAreaView>
            <ImageBackground
                style={{
                    width,
                    height: height + 30,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                source={{ uri: `https://images.unsplash.com/photo-1543637005-4d639a4e16de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60` }}
                onLoadEnd={() => setBackdropLoaded(true)}
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


                <FormLogin navigation={props.navigation}></FormLogin>
                <Text style={styles.logo}>Explanade</Text>

                {/* <Image
                    source={{ uri: `https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80}` }}
                    style={{
                        zIndex: 10,
                        position: 'absolute',
                        width: 200,
                        height: 300,
                        borderRadius: 20,
                        top: 110,
                        marginHorizontal: '25%'
                    }}
                    resizeMode={"contain"}
                /> */}
                <ActivityIndicator size="large" color="#000" style={{ height: '100%' }} animating={!backdropLoaded} />
            </ImageBackground >
        </SafeAreaView >
    )
}

