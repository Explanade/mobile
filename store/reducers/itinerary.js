import { SET_ITINERARIES, SET_ITINERARIES_LOADING, SET_ITINERARIES_ERROR } from '../actions/type'

const initialState = {
    error: null,
    loading: false,
    data: []
}

export default function itinerary(state = initialState, action) {
    switch (action.type) {
        case SET_ITINERARIES_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_ITINERARIES:
            return {
                ...state,
                data: action.itineraries,
                loading: false
            }
        case SET_ITINERARIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}