import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './store';
import LandingPage from './containers/LandingPage';
import Settings from './containers/Settings';
import Editor from './containers/Editor';
import {
    SignIn,
    Collection
} from './containers';
import Home from './containers/Home';
import './App.css';

const store = configureStore();

class App extends Component {


    componentDidMount(){
        window.ethereum.autoRefreshOnNetworkChange = false
    }

    render() {
        return (
            <main className="App">
                <Provider store={store}>
                    <Switch>
                        <Route path='/signin' component={SignIn} />
                        <Route path='/landing' component={LandingPage} />
                        <Route path='/app/:user/:threadAddress/:threadName' component={Collection} />
                        <Route path='/app/:user' component={Home} />
                        <Route path='/editor' component={Editor} />
                        <Route path='/settings' component={Settings} />
                        <Route exact path="/" render={() => (<Redirect to="/signin" />)} /> 
                    </Switch>
                </Provider>
            </main>
        );
    }
}

export default App;
