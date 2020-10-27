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


const transformCircular = createTransform(
    (inboundState, key) => Flatted.stringify(inboundState),
    (outboundState, key) => Flatted.parse(outboundState),
)

const persistConfig = {
    key: 'root',
    storage,
    transforms: [transformCircular]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {

    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        persistedReducer,
        compose(
            applyMiddleware(sagaMiddleware)
            // window.__REDUX_DEVTOOLS_EXTENSION__ &&
                // window.__REDUX_DEVTOOLS_EXTENSION__(),
        )
    );
    const persistor = persistStore(store)
    sagaMiddleware.run(rootSaga)
    return {store, persistor};
}

export default configureStore