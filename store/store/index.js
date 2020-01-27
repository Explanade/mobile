import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import loginAcc from '../reducers/loginAcc'
import itinerary from '../reducers/itinerary';

const reducers = combineReducers({ 
    loginAcc,
    itinerary
})


const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store
