import axios from '../../config/client'
import { AsyncStorage } from 'react-native'
import { useEffect } from 'react';

export default function changeStatus(payload) {
    console.log(payload, "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]")
    useEffect(() => {
        AsyncStorage.getItem('Access-Token')
            .then(data => {
                data = JSON.parse(data)
                console.log(data)
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
    })
}