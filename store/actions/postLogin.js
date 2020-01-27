import { SUC_LOG, FAIL_LOG, LOGOUT, EMPTY_INPUT } from './type'
import axios from '../../config/client'
import { setAccessToken } from '../../utils/token';

export const login = (payload) => async dispatch => {
    try {

        if (payload.email && payload.password) {

            const { data } = await axios({
                url: '/user/login',
                method: 'post',
                data: payload
            })
            console.log('========================================1231312', data)
            setAccessToken(JSON.stringify(data));

            dispatch({
                type: SUC_LOG,
                payload: data
            })

        } else if (!payload.password || !payload.email) {
            dispatch(emptyInput())
        }

    } catch (e) {
        console.log(e)
        dispatch({
            type: FAIL_LOG, payload: null
        })
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