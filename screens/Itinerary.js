import React, { useEffect, useCallback, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    Image,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import Timeline from '../components/Timeline'
const { width, height } = Dimensions.get('window')


export default function Itinerary(props) {

    const [itinerary, setItinerary] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [itinDetail, setItinDetail] = useState([]);
    const data = props.navigation.state.params.data

    const fetchData = () => {
        setLoading(true)
        setItinerary(data.itin)
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
        setItinerary(data.itin)
        setItinDetail(data.itin.activities[0].places)
    }, [data.itin]);

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const onRefresh = useCallback(() => {
        setRefresh(true);
        wait(1500).then(() => {
            fetchData();
            setRefresh(false);
        });
    }, [refresh]);

    const changedDay = (index) => {
        setLoading(true)
        setItinDetail(data.itin.activities[index].places)
        setLoading(false);

    }

    const seeMap = () => {
        props.navigation.push('MapView', { data: itinDetail, location: {
            latitude: itinerary.location.lat,
            longitude: itinerary.location.lng
        }})
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="transparent"
                translucent={true}
                networkActivityIndicatorVisible={true}
            />
            <View>
                <View>
                    <Image
                        source={{ uri: data.imagez }}
                        style={styles.headerImg}
                    />
                    <View style={styles.header}>
                        {
                            (data.itin.name.length <= 20)
                                ? (<Text style={styles.titleCol} >
                                    {data.itin.name}
                                </Text>)
                                : (
                                    <Text style={{
                                        fontFamily: 'Poppins-Medium',
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: 'white',
                                        letterSpacing: 0.15,
                                        marginHorizontal: 10
                                    }} >
                                        {data.itin.name}
                                    </Text>
                                )
                        }
                        <Text style={{ ...styles.total, textTransform: "uppercase", letterSpacing: 3 }}> {data.itin.location.name}</Text>
                        {
                            data.itin.date.total_days > 1
                            ? <Text style={{ ...styles.total, marginTop: 0 }}> {data.itin.date.total_days} days</Text>
                            : <Text style={{ ...styles.total, marginTop: 0 }}> {data.itin.date.total_days} day</Text>
                        }
                        <TouchableOpacity onPress={seeMap}>
                            <Text style={{ ...styles.total, textTransform: "uppercase", letterSpacing: 3 }}>SEE MAPS</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={{ backgroundColor: "transparent", marginBottom: 20 }}>
                        <FlatList
                            style={{ backgroundColor: "transparent" }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={data.itin.activities}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => changedDay(index)} >
                                    <Text style={styles.day}> day {index + 1} </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    {
                        isLoading
                            ? (
                                <ActivityIndicator size="large" color="#000" style={{ height: '100%' }} />
                            )
                            : (
                                <Timeline
                                    data={itinDetail}
                                    circleSize={9}
                                    circleColor='#f8d05d'
                                    lineColor='#53524b'
                                    timeContainerStyle={{
                                        minWidth: 10,
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItems: "center",
                                    }}
                                    timeStyle={{
                                        textAlign: 'center',
                                        backgroundColor: '#4abebd',
                                        color: 'white',
                                        paddingHorizontal: 5,
                                        paddingVertical: 6,
                                        borderRadius: 50,
                                        fontSize: 8,
                                        fontWeight: 'bold',
                                        width: 50 / 2,
                                        height: 50 / 2
                                    }}
                                    descriptionStyle={{ color: 'gray', fontSize: 9 }}
                                    options={{
                                        style: { paddingTop: 0, marginTop: 0, marginBottom: 160, paddingBottom: 30 }
                                    }}
                                    detailContainerStyle={{
                                        marginBottom: 20,
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                        borderRadius: 10,
                                    }}
                                    columnFormat="two-column"
                                />
                            )
                    }
                </View>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: 'white'
    },
    content: {
        width: '100%',
        height: height,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 5,
        shadowOffset: { width: 50, height: 50 },
        padding: 20,
        paddingBottom: 0
    },
    day: {
        marginHorizontal: 8,
        fontSize: 10,
        textAlign: "center",
        fontFamily: 'Quicksand-Medium',
        fontWeight: 'bold',
        color: '#3a3d3d',
        textTransform: "uppercase",
        backgroundColor: '#b3d7d8',
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
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
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
    headerImg: {
        height: 200,
        resizeMode: 'cover',
        position: 'relative',
        borderBottomRightRadius: 65,
        borderBottomLeftRadius: 65
    },
    header: {
        paddingTop: 50,
        resizeMode: 'cover',
        position: 'absolute',
        justifyContent: "center",
        textAlign: "center",
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        borderBottomRightRadius: 65,
        borderBottomLeftRadius: 65
    },
    total: {
        textAlign: "center",
        width: '100%',
        color: 'white',
        fontFamily: 'Poppins-Medium',
        color: 'white',
        fontSize: 12,
        marginTop: 2,
        marginBottom: 2,
    },
    titleCol: {
        textAlign: "center",
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 0.15,
    },
});
