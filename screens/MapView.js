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
import { LinearGradient } from "expo-linear-gradient";
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
            console.log(activity)
            temp.push(newObj)
        }
        console.log(markers, "=======================================================")
        setMarkers(temp)
    }, [])

    useEffect(() => {
        if (markers) {
            animation.addListener(({ value }) => { })
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
            {/* <LinearGradient></LinearGradient> */}
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
                    <View key={index} style={styles.shadowContainer}>

                        <View>
                            <Image
                                source={{ uri: marker.image }}
                                style={styles.imageCard}
                            />
                            <Text
                                textBreakStrategy="balanced"
                                // numberOfLines={3}
                                // ellipsizeMode={'tail'}
                                style={styles.titleRest}
                            >{marker.title}</Text>
                            {/* <Text numberOfLines={1} style={{
                                ...styles.titleRest,
                                fontSize: 11,
                                letterSpacing: 1,
                            }}>{marker.description}</Text> */}
                        </View>
                    </View>

                ))}
            </Animated.ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    layer: {
        flex: 1,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0, 0.5)',
        height,
        zIndex: 10
    },
    shadowContainer: {
        borderRadius: 15,
        margin: 10,
        elevation: 8,
        // backgroundColor: 'black',
        shadowOffset: { height: 4 },
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        width: CARD_WIDTH,
        height: 120,
    },
    imageCard: {
        width: CARD_WIDTH,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 15,
    },
    titleRest: {
        textAlign: "center",
        borderRadius: 15,
        width: CARD_WIDTH,
        height: 120,
        paddingTop: 50,
        paddingHorizontal: 10,
        color: 'white',
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 11,
        letterSpacing: 2,
        textShadowColor: "black",
        backgroundColor: "rgba(83,82,75, 0.4)",
        position: "absolute",
        zIndex: 10,
        borderWidth: 3,
        borderColor: "white"
    },
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