import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';
import LandingPage from './containers/LandingPage';
import Settings from './containers/Settings';
import Editor from './containers/Editor';
import Home from './containers/Home';
import './App.css';

const store = createStore(reducers);

class App extends Component {

    componentDidMount(){
        window.ethereum.autoRefreshOnNetworkChange = false
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
