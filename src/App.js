import React, {Component, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './store';
import LandingPage from './containers/LandingPage';
import Settings from './containers/Settings';
import './App.css';

import {
    Home,
    Editor,
    SignIn,
    Gallery,
    Discover,
    AddMember,
    Collection,
    JoinCollection
} from './containers';


const store = configureStore();

class App extends Component {

    render() {
        return (

            <main className="App">
                <Provider store={store}>
                    <Switch>
                        <Route path='/signin' component={SignIn} />
                        <Route path='/landing' component={LandingPage} /> 
                        <Route path='/gallery' component={Gallery} />          
                        <Route path='/app/add-member/:memberAddress/:id/:threadName/:email' component={AddMember}/>
                        <Route path='/app/accept-invite/:user/:threadId/:threadName' component={JoinCollection}/>
                        <Route path='/app/:user/:threadName/:itemId' component={Editor} />
                        <Route path='/app/:user/:threadName' component={Collection} />
                        <Route path='/app/:user' component={Home} />
                        <Route path='/discover' component={Discover} />
                        <Route exact path="/" render={() => (<Redirect to="/landing" />)} /> 
                    </Switch>
                </Provider>
            </main>
        );
    }
}

export default App;
