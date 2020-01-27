import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 3;
const CARD_WIDTH = CARD_HEIGHT - 10;

export default function Maps(props) {
    const { data, location } = props.navigation.state.params;

    const [animation, setAnimation] = useState(new Animated.Value(0))
    const [markers, setMarkers] = useState([])

    useEffect(() => {
        let temp = [];
        for (let act in data) {
            let activity = data[act];
            let newObj = {
                coordinate: {
                    latitude: activity.lat,
                    longitude: activity.lng
                },
                title: activity.name,
                description: activity.formatted_address,
                image: activity.photo
            }
            temp.push(newObj)
        }
        setMarkers(temp)
    }, [])

    useEffect(() => {
        if (markers) {
            animation.addListener(({ value }) => {})
        }
    }, [markers])

    const changeMapView = (target) => {
        let index = Math.floor(target / CARD_WIDTH + 0.3);
        if (index >= markers.length) {
            index = markers.length - 1;
        }
        if (index <= 0) {
            index = 0;
        }
        console.log(index)
    }

    const [region, setRegion] = useState({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
    });
    const [Maps, setMaps] = useState(null);

    const interpolations = markers.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];
        const opacity = animation.interpolate({
            inputRange,
            outputRange: [0.15, 1, 0.15],
            extrapolate: "clamp",
        });
        return { opacity };
    });

    const testDrag = (e) => {
        let xValue = e.nativeEvent.contentOffset.x;
        let index = Math.floor(xValue / CARD_WIDTH + 0.3)
        if (index >= markers.length) {
            index = markers.length - 1;
        }
        if (index <= 0) {
            index = 0;
        }
        const { coordinate } = markers[index];
        Maps.animateToRegion({
            ...coordinate,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
        }, 350)
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={map => setMaps(map)}
                initialRegion={region}
                style={styles.container}
            >
                {
                    markers.map((marker, index) => {
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <Marker key={index} coordinate={marker.coordinate}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <View style={styles.marker}>

                                        <Image source={{ uri: "https://img.icons8.com/plasticine/100/000000/marker.png" }} style={{ resizeMode: 'cover', flex: 1, width: '100%' }} />
                                    </View>
                                </Animated.View>
                            </Marker>
                        );
                    })
                }
            </MapView>
            <Animated.ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: animation,
                                },
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
                onScrollEndDrag={testDrag}
                
                style={styles.scrollView}
                contentContainerStyle={styles.endPadding}
            >
                {markers.map((marker, index) => (
                    <View style={styles.card} key={index}>
                        <Image
                            source={{uri: marker.image}}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.textContent}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                            <Text numberOfLines={1}>{marker.description}</Text>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 20,
        marginTop: 5,
        fontWeight: "bold",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 30,
        height: 40,
        borderRadius: 4,
    },
});