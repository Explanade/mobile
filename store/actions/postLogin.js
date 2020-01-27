import { SUC_LOG, FAIL_LOG, LOGOUT, EMPTY_INPUT } from './type'
import axios from '../../config/client'
import { setAccessToken } from '../../utils/token';

export const login = (payload) => async dispatch => {
    try {
    if (payload.email && payload.password) {
        // dispatch({
        //     type: 'SET_IS_LOADING',
        //     payload: true
        // })
        const { data } = await axios({
            url: '/user/login',
            method: 'post',
            data: payload
        })
        console.log(data, '======')
        setAccessToken(data.token);

        console.log(data, '<<<<<<<<<<<<<<<<<<<<<')
        dispatch({
            type: SUC_LOG,
            payload: data
        })
        // dispatch({
        //     type: FAIL_LOG,
        //     payload: null
        // })
    } else if (!payload.password || !payload.email) {
        dispatch(emptyInput())
    }
    // return (dispatch) => {
    //     if (payload.email && payload.password) {
    //         axios({
    //             method: 'post',
    //             url: "http://localhost:3000/user/login",
    //             data: payload
    //         })
    //             .then(({ data }) => {
    //                 const { profile_picture, name, _id } = data

    //                 dispatch(successLogin({
    //                     profile_picture, name, token: data.token, _id,
    //                 }))
    //             })
    //             .catch(err => {
    //                 dispatch(failLogin())
    //             })
    //     } else if (!payload.password || !payload.email) {
    //         dispatch(emptyInput())
    //     }
    // }
    } catch(e) {
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