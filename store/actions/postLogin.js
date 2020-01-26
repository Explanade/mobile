import { SUC_LOG, FAIL_LOG, LOGOUT, EMPTY_INPUT } from './type'
import axios from 'axios'


export const login = (payload) => {
    return (dispatch) => {
        if (payload.email && payload.password) {
            axios({
                method: 'post',
                url: "http://localhost:3000/user/login",
                data: payload
            })
                .then(async ({ data }) => {
                    const { profile_picture, name, itinerary, _id } = data

                    dispatch(successLogin({
                        profile_picture, name, itinerary, token: data.token, _id,
                    }))
                })
                .catch(err => {
                    dispatch(failLogin())
                })
        } else if (!payload.password || !payload.email) {
            dispatch(emptyInput())
        }
    }
}

export const successLogin = (payload) => {
    return ({
        type: SUC_LOG, payload: payload
    })
}


export const failLogin = () => {
    return ({
        type: FAIL_LOG, payload: null
    })
}

export const emptyInput = () => {
    return ({
        type: EMPTY_INPUT, payload: null
    })
}

export const logoutMe = () => {
    return ({
        type: LOGOUT, payload: null
    })
}