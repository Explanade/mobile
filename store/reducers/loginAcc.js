import { SUC_LOG, FAIL_LOG, LOGOUT, ADD_BOWL, EMPTY_INPUT } from '../actions/type'

const initialState = {
    isLoading: true,
    isLogin: false,
    message: null,
    token: null,
    profile_picture: null,
    name: null,
    _id: null,
}


export default function login(state = initialState, action) {
    switch (action.type) {
        case SUC_LOG:
            return {
                ...state,
                token: action.payload.token,
                isLogin: true,
                isLoading: false,
                profile_picture: action.payload.profile_picture,
                name: action.payload.name,
                _id: action.payload._id,
            }
        case LOGOUT:
            return {
                ...state,
                isLoading: false,
                isLogin: false,
                message: null,
                token: null,
                profile_picture: null,
                name: null,
                itinerary: null,
                _id: null,
            }
        case ADD_BOWL:
            return {
                ...state,
            }
        case FAIL_LOG:
            return {
                ...state,
                isLogin: false,
                isLoading: false,
                message: 'Wrong email and password'
            }
        case EMPTY_INPUT:
            return {
                ...state,
                isLogin: false,
                isLoading: false,
                message: 'Please input email and password'
            }
        default:
            return state
    }
}