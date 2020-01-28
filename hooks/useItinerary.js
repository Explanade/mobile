import { useEffect } from 'react';
import { AsyncStorage } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { SET_ITINERARIES_LOADING, SET_ITINERARIES, SET_ITINERARIES_ERROR } from '../store/actions/type';
import axios from '../config/client';

export default function useItinerary() {
    const dispatch = useDispatch()
    const { data, loading, error } = useSelector(state => state.itinerary)

    useEffect(() => {
        if (data.length <= 0) {
            dispatch({
                type: SET_ITINERARIES_LOADING
            })
            AsyncStorage.getItem('Access-Token')
                .then(data => {
                    data = JSON.parse(data)
                    return axios({
                        url: '/itineraries/my-itineraries',
                        headers: { token: data.token }
                    })
                })
                .then(({ data }) => {
                    dispatch({
                        type: SET_ITINERARIES,
                        itineraries: data
                    })

                })
                .catch(e => {
                    dispatch({
                        type: SET_ITINERARIES_ERROR,
                        error: e.message
                    })
                })
        }
    }, [data])

    return { data, loading, error };
}