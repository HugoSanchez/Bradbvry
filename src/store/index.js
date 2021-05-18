import rootSaga from '../sagas';
import rootReducer from '../reducers'; 
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import * as Flatted from 'flatted'; 

import { 
    persistStore, 
    persistReducer, 
    createTransform 
} from 'redux-persist'

import { 
    compose,
    createStore, 
    applyMiddleware  
} from 'redux';

// This function allows us to stringify 'circular' JSON data
// LibP2P objects from 3box were throwing errors.
const transformCircular = createTransform(
    (inboundState, key) => Flatted.stringify(inboundState),
    (outboundState, key) => Flatted.parse(outboundState),
)

// Basic redux-persist configuration object.
// Notice we pass into it the transformCircular function.
const persistConfig = {
    key: 'root',
    storage,
    transforms: [transformCircular],
    blacklist: ['user']
}



// Here we are instantiating a reducer object with redux-persist
// as opposed to passing the rootReducer directly into the createStore function.
const persistedReducer = persistReducer(persistConfig, rootReducer)

// This is the main configuration function that returns the store
// and the persistor. We're passing into it the persistedReducer 
// and also configuring the saga middleware.
const configureStore = () => {
    // Saga Middleware
    const sagaMiddleware = createSagaMiddleware()
    // Store
    const store = createStore(
        persistedReducer,
        compose(
            applyMiddleware(sagaMiddleware)
                // window.__REDUX_DEVTOOLS_EXTENSION__ &&
                    // window.__REDUX_DEVTOOLS_EXTENSION__(),
        )
    );
    // Persistor.
    const persistor = persistStore(store)
    // Fire up Saga Middleware
    sagaMiddleware.run(rootSaga)
    // Return store and peristor; used in App.js
    return {store, persistor};
}

export default configureStore