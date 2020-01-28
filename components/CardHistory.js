import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

export default function Card({ itin, featured_image, navigation }) {


    const styles = StyleSheet.create({
        imageCard: {
            width: 190,
            height: 120,
            resizeMode: 'cover',
            borderRadius: 15,
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
            width: 190,
            height: 120,
            paddingTop: 70,
            color: 'white',
            textAlign: "center",
            fontWeight: 'bold',
            fontSize: 11,
            letterSpacing: 2,
            textShadowColor: "black",
            backgroundColor: "rgba(83,82,75, 0.2)",
            position: "absolute",
            zIndex: 10
        },
        descRest: {
            marginHorizontal: 4,
            fontSize: 11,
            color: '#89959C',
            fontFamily: 'Poppins-Medium',
        }
    })

    return (
        <View>
            {/* <Text> {JSON.stringify(itin)}</Text> */}
            <TouchableHighlight
                style={{ borderRadius: 15 }}
                onPress={() => navigation.navigate('Itinerary', { data: { itinId: itin._id,itin, imagez: featured_image } })}
            >
                <View>
                    <Image
                        source={{ uri: featured_image }}
                        style={styles.imageCard}
                    />
                    <Text style={styles.titleRest}>{itin.location.name}</Text>
                </View>
            </TouchableHighlight>

        </View>
    )
}