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
import CardHistory from '../components/CardHistory'

const Images = [
    { uri: "https://i.imgur.com/sNam9iJ.jpg" },
    { uri: "https://i.imgur.com/N7rlQYt.jpg" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 3;
const CARD_WIDTH = CARD_HEIGHT - 10;


export default function Maps(props) {
    const [animation, setAnimation] = useState(new Animated.Value(0))
    const [markers, setMarkers] = useState([
        {
            coordinate: {
                latitude: 45.524548,
                longitude: -122.6749817,
            },
            name: "Best Place",
            description: "This is the best place in Portland",
            image: Images[0],
        },
        {
            coordinate: {
                latitude: 45.524698,
                longitude: -122.6655507,
            },
            name: "Second Best Place",
            description: "This is the second best place in Portland",
            image: Images[1],
        },
        {
            coordinate: {
                latitude: 45.5230786,
                longitude: -122.6701034,
            },
            name: "Third Best Place",
            description: "This is the third best place in Portland",
            image: Images[2],
        },
        {
            coordinate: {
                latitude: 45.521016,
                longitude: -122.6561917,
            },
            name: "Fourth Best Place",
            description: "This is the fourth best place in Portland",
            image: Images[3],
        },
    ]);
    const [region, setRegion] = useState({
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
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
                style={styles.scrollView}
                contentContainerStyle={styles.endPadding}
            >
                {markers.map((marker, index) => (
                    <View key={index} style={styles.shadowContainer}>
                        <CardHistory
                            itin={marker}
                            navigation={props.navigation}
                            featured_image={Images[index].uri}
                        />
                    </View>
                    // <View style={styles.card} key={index}>
                    //     <Image
                    //         source={marker.image}
                    //         style={styles.cardImage}
                    //         resizeMode="cover"
                    //     />
                    //     <View style={styles.textContent}>
                    //         <Text numberOfLines={1} style={styles.cardname}>{marker.name}</Text>
                    //     </View>
                    // </View>
                ))}
            </Animated.ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
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