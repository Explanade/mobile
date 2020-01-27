import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import loginAcc from '../reducers/loginAcc'

const reducers = combineReducers({ 
    loginAcc
})


const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store
