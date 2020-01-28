import React, { useEffect, useCallback, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    Dimensions,
    Image,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CardHistory from '../components/CardHistory'
import { useSelector } from 'react-redux'
const { width, height } = Dimensions.get('window')
import useItinerary from '../hooks/useItinerary';

const featured_image = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    'https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    'https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    'https://images.unsplash.com/photo-1418985227304-f32df7d84e39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    'https://images.unsplash.com/photo-1494783435443-c15feee0a80a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    'https://images.unsplash.com/photo-1485601284679-a2f86e6f7dea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60'
]

export default function Profile(props) {

    const [itinerary, setItinerary] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [location, setLocation] = useState({})
    const [address, setAddress] = useState([])
    const [dayz, setDayz] = useState(0)
    const {
        isLoading,
        isLogin,
        profile_picture,
        name,
    } = useSelector(state => state.loginAcc)

    console.log(name, profile_picture)

    const { data, loading, error } = useItinerary();

    useEffect(() => {
        if (!isLogin) {
            props.navigation.navigate('LoginPage')
        }
    }, [isLogin]);

    useEffect(() => {
        if (data) {
            setDayz((data.map(item => { return item.date.total_days })).reduce(getSum, 0))
        }
    }, [data])

    useEffect(() => {
        async function getLocation() {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                console.log('error')
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation({ location })
            const a = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
            setAddress(a)
            console.log(address)
        }
        getLocation()
    }, [])

    function getSum(total, num) {
        return total + Math.round(num);
    }

    function random() {
        let num = Math.floor(Math.random() * featured_image.length)
        return num
    }

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const onRefresh = useCallback(() => {
        setRefresh(true);
        wait(1500).then(() => {
            getLocation()
            setDayz((data.map(item => { return item.date.total_days })).reduce(getSum, 0))
            setRefresh(false);
        });
    }, [refresh]);



    async function getLocation() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log('error')
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({ location })
        const a = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        })
        setAddress(a)
        console.log(address)
    }

    if (data.length > 0) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor="transparent"
                    translucent={true}
                    networkActivityIndicatorVisible={true}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />} >
                    <View>
                        <Image
                            source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4a50cc91022991.5e281f81cd78d.jpg' }}
                            style={{
                                top: 0,
                                height: height / 2,
                                resizeMode: 'cover',
                                top: 0,
                                position: 'relative'
                            }}
                            blurRadius={1}
                        />
                        <View style={styles.layer} />
                        <View style={styles.header}>
                            <Image
                                source={{ uri: profile_picture }}
                                style={styles.pp}
                            />
                            {
                                (name.length <= 20)
                                    ? (
                                        <Text style={styles.titleCol} >
                                            {name}
                                        </Text>)
                                    : (
                                        <Text style={{
                                            fontFamily: 'Poppins-Medium',
                                            fontSize: 25,
                                            fontWeight: 'bold',
                                            color: 'white',
                                            letterSpacing: 0.15,
                                            marginHorizontal: 10
                                        }} >
                                            {name}
                                        </Text>
                                    )
                            }
                            <Text style={styles.total}>
                                {data.length} trips - {dayz} days
                            </Text>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.shadowLocation2}>
                            <View style={styles.location2} >
                                <FontAwesome5 name={'map-marker-alt'}
                                    style={{
                                        fontSize: 15,
                                        color: '#fdcf48',
                                        paddingBottom: 0,
                                        // marginLeft: -10
                                    }} >
                                    <Text style={{
                                        ...styles.total,
                                        color: '#154036',
                                        color: 'white',
                                        fontSize: 13,
                                        width: '80%',
                                        textAlign: "left",
                                        fontWeight: '700',
                                        letterSpacing: 1
                                    }}> YOU'RE IN</Text>
                                </FontAwesome5>
                                <Text
                                    style={{
                                        ...styles.total,
                                        color: 'white',
                                        fontSize: 10,
                                        width: '70%',
                                        textAlign: "center",
                                        margin: 0,
                                        padding: 0
                                    }}
                                >
                                    {
                                        address.length >= 1
                                            ? ` ${address[0].city.split(' ').slice(1, 3).join(' ')}\n ${address[0].region} ,${address[0].country}`
                                            : 'Jakarta'
                                    }
                                </Text>
                            </View>
                        </View>

                        <View >
                            <Text
                                style={{
                                    ...styles.title,
                                    paddingLeft: 8,
                                    marginBottom: 9,
                                }}
                            >ONGOING TRIP</Text>

                            <View>
                                <TouchableHighlight
                                    style={styles.shadowContainer2}
                                    onPress={() => props.navigation.navigate('Itinerary', { data: { itin: data[0], imagez: `https://source.unsplash.com/1600x900/?${data[0].location.name}` ? `https://source.unsplash.com/1600x900/?${data[0].location.name}` : featured_image[random()] } })}
                                >
                                    <View style={styles.descCard}>
                                        <Image
                                            source={{ uri: `https://source.unsplash.com/1600x900/?${data[0].location.name}` ? `https://source.unsplash.com/1600x900/?${data[0].location.name}` : featured_image[random()] }}
                                            style={styles.imageCard}
                                        />
                                        <Text style={styles.titleRest}>{data[0].location.name}</Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                ...styles.descRest
                                            }}>
                                            {`${(data[0].date.start).split('T')[0]} / ${(data[0].date.end).split('T')[0]} `}
                                            {`\n${data[0].date.total_days} days`}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={{ marginLeft: 25, left: 20, top: -20, width: width, bottom: 25 }}>
                            <Text style={styles.title}>LATEST TRIPS</Text>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={styles.layoutEst}
                            >
                                {
                                    data.map((item, i) => (
                                        <View key={i} style={styles.shadowContainer}>
                                            <CardHistory
                                                itin={item}
                                                navigation={props.navigation}
                                                featured_image={featured_image[i] ? featured_image[i] : item.activities[i].places[0].photo}
                                            />
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >
        )
    }
    else return <Text>asd</Text>
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: 'white',
        top: 0,
    },
    content: {
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: 'white',
        top: -70,
        shadowColor: 'black',
        shadowOpacity: 5,
        shadowOffset: { width: 50, height: 50 },
        // paddingHorizontal: 25,
        paddingTop: 20,
        paddingBottom: 0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    day: {
        marginHorizontal: 5,
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Quicksand-Medium',
        color: 'white',
        backgroundColor: 'rgba(255,255,255, 0.3)',
        borderRadius: 12,
        padding: 5
    },
    title: {
        // padding: 4,
        marginVertical: 5,
        paddingLeft: 5,
        color: 'black',
        letterSpacing: 3,
        marginHorizontal: 5,
        fontWeight: '600',
        fontSize: 12,
        fontFamily: 'Quicksand-Medium'
    },
    header: {
        width: '100%',
        height: height / 2.2,
        resizeMode: 'cover',
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    layer: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        position: 'absolute'
    },
    total: {
        textAlign: "center",
        width: '50%',
        color: 'white',
        fontFamily: 'Poppins-Medium',
        color: 'white',
        fontSize: 12,
        marginTop: 2,
        marginBottom: 2,
        marginHorizontal: 10
    },
    titleCol: {
        fontFamily: 'Brittanian',
        fontSize: 50,
        fontWeight: '500',
        color: 'white',
        letterSpacing: 0.15,
        marginHorizontal: 10,
        marginVertical: 20
    },
    pp: {
        width: 75,
        height: 75,
        borderRadius: 50
    },
    shadowContainer: {
        borderRadius: 15,
        margin: 5,
        elevation: 8,
        // backgroundColor: 'black',
        shadowOffset: { height: 4 },
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        width: 190,
        height: 120,
    },
    shadowLocation2: {
        marginHorizontal: 15,
        marginTop: -79,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        // backgroundColor: "#e5f6f4",
        borderRadius: 25,
        padding: 8,
        // elevation: 3,
        // shadowOffset: { height: 4 },
        // shadowColor: "black",
        // shadowOpacity: 0.8,
        // shadowRadius: 5,
        // borderWidth: 2,
        // borderColor: 'white'

    },
    location2: {
        color: 'black',
        top: 5,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        paddingBottom: -10
    },
    imageCard: {
        width: 340,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: -30
    },
    shadowContainer2: {
        borderRadius: 15,
        margin: 5,
        // elevation: 8,
        // shadowOffset: { height: 4 },
        // shadowColor: "black",
        // shadowOpacity: 0.8,
        // shadowRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        height: 280,
    },
    descCard: {
        width: 350,
        height: 250,
        flex: 1,
        padding: 5,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        position: 'relative'
    },
    rating: {
        fontSize: 10,
        position: 'absolute',
        bottom: 74,
        right: 10,
        borderRadius: 8,
        color: 'white',
        overflow: 'hidden',
        padding: 5
    },
    titleRest: {
        borderRadius: 15,
        // width: 150,
        // height: 100,
        // paddingTop: 10,
        marginTop: -40,
        color: 'white',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 35,
        margin: 3,
        textTransform: "uppercase",
        letterSpacing: 1.6,
        textShadowColor: "black",
        // backgroundColor: "rgba(83,82,75, 0.2)",
        // position: "absolute",
        zIndex: 10
    },
    descRest: {
        textAlign: 'left',
        marginHorizontal: 4,
        fontSize: 11,
        color: '#89959C',
        fontFamily: 'Poppins-Medium',
    }
});
