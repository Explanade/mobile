import React, { useState, useEffect } from 'react'
import { CheckBox } from 'react-native-elements'
import { View, Text } from 'react-native'

import axios from '../config/client'
import { AsyncStorage } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';



export default function Checkbox(props) {
    const [status, setStatus] = useState('')
    const dispatch = useDispatch()
    const { data: reduxItin } = useSelector(state => state.itinerary)
    const { setItinDetail, itinDetail } = props;

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    function changeStatus(payload) {
        AsyncStorage.getItem('Access-Token')
            .then(data => {
                data = JSON.parse(data)
                return axios({
                    url: `/activities/${payload.activity_id}`,
                    method: 'patch',
                    headers: { token: data.token },
                    data: {
                        place_id: payload.place_id,
                        status: payload.status
                    }
                })
            })
            .then(({ data }) => {
                let updatedItin = [];
                reduxItin.map(itin => {
                    if (itin._id == data._id) {
                        updatedItin.push(data)
                    } else {
                        updatedItin.push(itin)
                    }
                })
                dispatch({
                    type: 'UPDATE_ACTIVITY_STATUS',
                    itin: updatedItin
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const updateStatus = () => {
        let activityData = {
            activity_id: props.activity_id,
            place_id: props.place_id,
            status: !status
        }

        let itinTemp = []
        for (let i = 0; i < itinDetail.length; i++) {
            if (itinDetail[i].id == props.place_id) {
                itinDetail[i].status = !itinDetail[i].status
                itinTemp.push(itinDetail[i]);
            } else {
                itinTemp.push(itinDetail[i])
            }
        }
        setItinDetail(itinTemp)
        setStatus(!status)
        changeStatus(activityData)
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: "center", marginLeft: -10 }}>
            <CheckBox
                containerStyle={{ marginTop: 5, padding: 0 }}
                checked={status}
                onPress={updateStatus}
            />
            <Text style={{
                marginLeft: -5,
                color: !status ? 'grey' : '#154036',
                fontSize: 10,
                fontFamily: 'Poppins-Medium'
            }}> complete</Text>
        </View >
    )
}