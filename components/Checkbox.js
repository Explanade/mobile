import React, { useState, useEffect } from 'react'
import { CheckBox } from 'react-native-elements'
import { View, Text } from 'react-native'

import axios from '../config/client'
import { AsyncStorage } from 'react-native'



export default function Checkbox(props) {
    const [status, setStatus] = useState('')

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    function changeStatus(payload) {
        AsyncStorage.getItem('Access-Token')
            .then(data => {
                data = JSON.parse(data)
                console.log(data.token)
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
                console.log(data)
                console.log('berhasil update')
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