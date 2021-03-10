import rootSaga from '../sagas';
import rootReducer from '../reducers'; 
import createSagaMiddleware from 'redux-saga';
import { 
    compose,
    createStore, 
    applyMiddleware  
} from 'redux';


const configureStore = () => {

    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(sagaMiddleware)
            // window.__REDUX_DEVTOOLS_EXTENSION__ &&
              //  window.__REDUX_DEVTOOLS_EXTENSION__(),
        )
    );
    sagaMiddleware.run(rootSaga)
    return store;
}

export default configureStore