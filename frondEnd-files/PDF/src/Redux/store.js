
import {configureStore} from '@reduxjs/toolkit'
import appReducer from './reducerFunction';

const store=configureStore({
    reducer:{
        app: appReducer,
    }
})

export default store;