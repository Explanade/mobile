import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import loginAcc from '../reducers/loginAcc'
import serviceTask from '../reducers/serviceTask'
import rankBakso from '../reducers/rankBakso'

const reducers = combineReducers({ 
    loginAcc, serviceTask, rankBakso
})


const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store
