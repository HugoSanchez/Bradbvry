import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import configureStore from './store';
import LandingPage from './containers/LandingPage';
import Settings from './containers/Settings';
import Editor from './containers/Editor';
import {
    SignIn,
    AddMember,
    Collection,
    JoinCollection
} from './containers';
import Home from './containers/Home';
import './App.css';

const {store, persistor} = configureStore();

class App extends Component {

    render() {
        return (

            <main className="App">
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Switch>
                            <Route path='/signin' component={SignIn} />
                            <Route path='/landing' component={LandingPage} />          
                            <Route path='/app/add-member/:memberAddress/:thread/:threadName/:email' component={AddMember}/>
                            <Route path='/app/accept-invite/:user/:thread/:threadName' component={JoinCollection}/>
                            <Route path='/app/:user/:threadAddress/:threadName' component={Collection} />
                            <Route path='/app/:user' component={Home} />
                            <Route path='/editor' component={Editor} />
                            <Route path='/settings' component={Settings} />
                            <Route exact path="/" render={() => (<Redirect to="/landing" />)} /> 
                        </Switch>
                    </PersistGate>
                </Provider>
            </main>
        );
    }
}

export default App;
