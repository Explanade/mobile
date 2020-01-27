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
const { width, height } = Dimensions.get('window')

const itineraries = [{
    location: {
        name: "Bandung",
        lat: -6.903429,
        lng: 107.5030708
    },
    date: {
        start: "2020-01-19T17:00:00.000Z",
        end: "2020-01-21T17:00:00.000Z",
        total_days: 2
    },
    activities: [
        {
            _id: "5e2b59d896caab340f12b1e5",
            date: "2020-10-20T00:00:00.000Z",
            places: [
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1eb",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '09:00',
                    _id: "5e2b59d896caab340f12b1ea",
                    status: false,
                    order: 1,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                }
            ],
            __v: 0
        }
    ],
    reviews: [
        "5e2ad8c86722641dfa880cff"
    ],
    _id: "5e2ad7de751f171deef9db9f",
    name: "My Awesome Trip",
    user_id: "5e2ab24285fb6f17f71f4d73",
    __v: 0
},
{
    location: {
        name: "Bali",
        lat: -6.903429,
        lng: 107.5030708
    },
    date: {
        start: "2020-01-19T17:00:00.000Z",
        end: "2020-01-21T17:00:00.000Z",
        total_days: 2
    },
    activities: [
        {
            _id: "5e2b59d896caab340f12b1e5",
            date: "2020-10-20T00:00:00.000Z",
            places: [
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1eb",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '09:00',
                    _id: "5e2b59d896caab340f12b1ea",
                    status: false,
                    order: 1,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                }
            ],
            __v: 0
        }
    ],
    reviews: [
        "5e2ad8c86722641dfa880cff"
    ],
    _id: "5e2ad7de751f171deef9db9f",
    name: "My Awesome Trip",
    user_id: "5e2ab24285fb6f17f71f4d73",
    __v: 0
}, {
    location: {
        name: "Bali",
        lat: -6.903429,
        lng: 107.5030708
    },
    date: {
        start: "2020-01-19T17:00:00.000Z",
        end: "2020-01-21T17:00:00.000Z",
        total_days: 2
    },
    activities: [
        {
            _id: "5e2b59d896caab340f12b1e5",
            date: "2020-10-20T00:00:00.000Z",
            places: [
                {
                    photos: [
                        {
                            _id: "5e2b59d896caab340f12b1eb",
                            height: 2000,
                            photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
                            width: 3008
                        }
                    ],
                    time: '09:00',
                    _id: "5e2b59d896caab340f12b1ea",
                    status: false,
                    order: 1,
                    formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
                    lat: -8.149365,
                    lng: 115.0493949,
                    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                    id: "69493390994402db96ce08fc41c43abbcf5559f8",
                    title: "Secret Garden Restaurant",
                    place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
                    price_level: 2,
                    rating: 4.6,
                    user_ratings_total: 269
                }
            ],
            __v: 0
        }
    ],
    reviews: [
        "5e2ad8c86722641dfa880cff"
    ],
    _id: "5e2ad7de751f171deef9db9f",
    name: "My Awesome Trip",
    user_id: "5e2ab24285fb6f17f71f4d73",
    __v: 0
}]

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

const profile = {
    name: "Afifah Rahma K",
    profile_picture: `https://ui-avatars.com/api/?name=Afifah&rounded=true`
}

export default function Home(props) {

    const [itinerary, setItinerary] = useState({});
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [location, setLocation] = useState({})
    const [address, setAddress] = useState([])
    const [dayz, setDayz] = useState(0)

    const getTrending = () => {
        setItinerary(itineraries)
        setLoading(false);
    }

    function getSum(total, num) {
        return total + Math.round(num);
    }

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const onRefresh = useCallback(() => {
        setRefresh(true);
        wait(1500).then(() => {
            getTrending();
            setRefresh(false);
        });
    }, [refresh]);

    useEffect(() => {
        getTrending();
        setDayz((itineraries.map(item => { return item.date.total_days })).reduce(getSum, 0))
    }, []);

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
                            source={{ uri: profile.profile_picture }}
                            style={styles.pp}
                        />
                        {
                            (profile.name.length <= 20)
                                ? (
                                    <Text style={styles.titleCol} >
                                        {profile.name}
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
                                        {profile.name}
                                    </Text>
                                )
                        }
                        <Text style={styles.total}>
                            {itineraries.length} trips - {dayz} days
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
                                    marginLeft: -10
                                }} >
                                <Text style={{
                                    ...styles.total,
                                    color: '#154036',
                                    color: 'black',
                                    fontSize: 13,
                                    width: '80%',
                                    textAlign: "left",
                                    paddingBottom: 0,
                                    fontWeight: '600',
                                    letterSpacing: 1
                                }}>   YOU'RE IN </Text>
                            </FontAwesome5>
                            <Text
                                style={{
                                    ...styles.total,
                                    color: 'white',
                                    fontSize: 9,
                                    width: '70%',
                                    textAlign: "center",
                                    margin: 0,
                                    padding: 0
                                }}
                            >
                                {
                                    address.length >= 1
                                        ? ` ${address[0].city.split(' ').slice(1, 3).join(' ')}\n ${address[0].region} \n ${address[0].country}`
                                        : 'Jakarta'
                                }
                            </Text>
                        </View>
                    </View>

                    <View >
                        <Text
                            style={{
                                ...styles.title,
                                paddingLeft: 0,
                                marginBottom: 9,
                            }}
                        >ONGOING TRIP</Text>

                        <View>
                            <TouchableHighlight
                                style={styles.shadowContainer2}
                                onPress={() => props.navigation.navigate('Itinerary')}
                            >
                                <View style={styles.descCard}>
                                    <Image
                                        source={{ uri: featured_image[4] }}
                                        style={styles.imageCard}
                                    />
                                    <Text style={styles.titleRest}>{itineraries[0].location.name}</Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            ...styles.descRest
                                        }}>
                                        {`${(itineraries[0].date.start).split('T')[0]} - ${(itineraries[0].date.end).split('T')[0]} `}
                                        {`\n${itineraries[0].date.total_days} days`}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        {/* <View style={{
                            ...styles.location,
                            marginBottom: 19
                        }} >
                            <FontAwesome5 name={'map-marker-alt'}
                                style={{
                                    fontSize: 15,
                                    color: '#fdcf48',
                                    marginRight: 10,
                                    paddingLeft: 10
                                }} />
                            <Text
                                style={{
                                    ...styles.total,
                                    color: 'black',
                                    fontSize: 11,
                                    width: '80%',
                                    textAlign: "left"
                                }}
                            >
                                {
                                    address.length >= 1
                                        ? `${address[0].city.split(' ').slice(1, 3).join(' ')}, ${address[0].region}`
                                        : 'Loading...'
                                }
                            </Text>
                        </View> */}
                    </View>
                    <View style={{ marginLeft: 25 }}>
                        <Text style={styles.title}>LATEST TRIPS</Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={styles.layoutEst}
                        >
                            {
                                itineraries.map((item, i) => (
                                    <View key={i} style={styles.shadowContainer}>
                                        <CardHistory
                                            itin={item}
                                            navigation={props.navigation}
                                            featured_image={featured_image[i]}
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
        top: -40,
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
        padding: 4,
        marginVertical: 5,
        paddingLeft: 8,
        color: 'black',
        letterSpacing: 3,
        marginHorizontal: 5,
        fontWeight: '600',
        fontSize: 12,
        fontFamily: 'Quicksand-Medium'
    },
    navbutton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'black',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        marginHorizontal: 10,
        opacity: 0.6,
    },
    button: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 10,
    },
    header: {
        width: '100%',
        height: height / 2.2,
        resizeMode: 'cover',
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 20,
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
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 0.15,
        marginHorizontal: 10
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
        height: 100,
        width: 155
    },
    shadowLocation: {
        marginHorizontal: 15,
        marginTop: -40,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        // backgroundColor: "rgba(0,0,0, 0.1)",
        borderRadius: 5,
        padding: 8,
        // elevation: 6,
        // shadowOffset: {height: 4 },
        // shadowColor: "black",
        // shadowOpacity: 0.8,
        // shadowRadius: 5,
        height: '8%',
        // borderWidth: 2,
        // borderColor: 'white'

    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: "white",
        // borderRadius: 20,
        // padding: 10
    },
    shadowLocation2: {
        marginHorizontal: 15,
        marginTop: -125,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        // backgroundColor: "rgba(0,0,0, 0.1)",
        borderRadius: 5,
        padding: 8,
        // elevation: 6,
        // shadowOffset: {height: 4 },
        // shadowColor: "black",
        // shadowOpacity: 0.8,
        // shadowRadius: 5,
        // borderWidth: 2,
        // borderColor: 'white'

    },
    location2: {
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: "white",
        // borderRadius: 20,
        // padding: 10
    },
    imageCard: {
        width: 340,
        height: 180,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: -20
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
        height: 250,
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
