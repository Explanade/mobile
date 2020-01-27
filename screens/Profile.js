import React, { useEffect, useCallback, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Dimensions,
    Image,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import CardHistory from '../components/CardHistory'
import { useSelector } from 'react-redux'
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

export default function Profile(props) {

    const [itinerary, setItinerary] = useState({});
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const { isLogin } = useSelector(state => state.loginAcc)

    console.log(itinerary)
    const getTrending = () => {
        setItinerary(itineraries)
        setLoading(false);
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
        console.log(isLogin, '::::::::::::::::::::::')
        if(!isLogin) {
            props.navigation.navigate('LoginPage')
        }
    }, []);
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
                <View   >
                    <Image
                        source={{ uri: 'https://cdn.dribbble.com/users/548267/screenshots/7009894/media/7c195a7fbbdb8faee533f8324219d399.jpg' }}
                        style={{
                            top: 0,
                            height: height / 2.2,
                            resizeMode: 'cover',
                            top: 0,
                            position: 'relative'
                        }}
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
                        <Text style={styles.total}> {itineraries.length}</Text>
                        {/* {
                            itineraries.date.total_days > 1
                                ? <Text style={{ ...styles.total, marginTop: 0 }}> {itineraries.date.total_days} days</Text>
                                : <Text style={{ ...styles.total, marginTop: 0 }}> {itineraries.date.total_days} day</Text>
                        } */}
                    </View>
                </View>
                <View style={styles.content}>
                    <View>

                    </View>
                    <View style={{ marginBottom: 0 }}>
                        <Text style={styles.title}>LAST TRIP</Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={styles.layoutEst}
                        >
                            {
                                itineraries.map((item, i) => (
                                    <View key={i} style={styles.shadowContainer}>
                                        <CardHistory
                                            itin={item.itin}
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
        top: 0
    },
    content: {
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: 'white',
        top: -40,
        shadowColor: 'black',
        shadowOpacity: 5,
        shadowOffset: { width: 50, height: 50 },
        padding: 20,
        paddingBottom: 0
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
        marginTop: 5,
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
        elevation: 6,
        shadowOffset: { height: 4 },
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
});
