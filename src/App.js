import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import configureStore from './store';
import Router from './router';
import './App.css'

const {store, persistor} = configureStore();

class App extends Component {

    render() {
        return (

            <main className="App">
                <Provider store={store}>
                    <PersistGate 
                        loading={null} 
                        persistor={persistor}>
                            <Router />
                    </PersistGate>
                </Provider>
            </main>

        );
    }
}

export default App;