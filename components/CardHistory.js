import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default function Card({ itin, featured_image, navigation }) {

    const ItineraryDetail = (data) => {
        navigation.navigate('ItineraryDetail', { data })
    }

    const styles = StyleSheet.create({
        imageCard: {
            width: 160,
            height: 110,
            resizeMode: 'cover',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            position: 'relative'
        },
        descCard: {
            width: 160,
            height: 50,
            backgroundColor: 'white',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
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
            marginTop: -30,
            marginHorizontal: 4,
            color: 'white',
            fontFamily: 'Poppins-Medium',
            fontWeight: '900',
            fontSize: 20,
            textTransform: "uppercase",
            letterSpacing: 2,
            textShadowColor: "black"
        },
        descRest: {
            marginHorizontal: 4,
            fontSize: 11,
            color: '#89959C',
            fontFamily: 'Poppins-Medium',
        }
    })

    return (
        <TouchableOpacity
            onPress={() => ItineraryDetail(itin)}
        >
            <Image
                source={{ uri: featured_image }}
                style={styles.imageCard}
            />
            <View style={styles.descCard}>
                <Text style={styles.titleRest}>Bandung</Text>
            </View>
        </TouchableOpacity>
    )
}