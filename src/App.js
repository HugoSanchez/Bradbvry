import React, {Component, useEffect} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store';
import Router from './router';
import './App.css'

const store = configureStore();

class App extends Component {

    render() {
        return (

            <main className="App">
                <Provider store={store}>
                    <Router />
                </Provider>
            </main>

        );
    }
}

export default App;
