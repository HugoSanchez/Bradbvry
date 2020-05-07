import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './store';
import LandingPage from './containers/LandingPage';
import Settings from './containers/Settings';
import Editor from './containers/Editor';
import Home from './containers/Home';
import './App.css';

const store = configureStore();

class App extends Component {

    componentDidMount(){
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.autoRefreshOnNetworkChange = false
        }
    }

    render() {
        return (
            <main className="App">
                <Provider store={store}>
                    <Switch>
                        <Route path='/landing' component={LandingPage} />
                        <Route path='/home' component={Home} />
                        <Route path='/editor' component={Editor} />
                        <Route path='/settings' component={Settings} />
                        <Route exact path="/" render={() => (<Redirect to="/landing" />)} /> 
                    </Switch>
                </Provider>
            </main>
        );
    }
}

export default App;
