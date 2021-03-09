import React, {Fragment, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LandingPage from '../containers/LandingPage';
import Settings from '../containers/Settings';
import {StyledToastContainer} from '../components';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

import {
    Home,
    Editor,
    SignIn,
    Gallery,
    Discover,
    AddMember,
    Collection,
    JoinCollection
} from '../containers';

const Router = () => {

    return (
        <Fragment>

            <StyledToastContainer />

            <Switch>
                <Route path='/signin' component={SignIn} />
                <Route path='/landing' component={LandingPage} /> 
                <Route path='/gallery' component={Gallery} />  
                <Route path='/discover' component={Discover} />        
                <Route path='/app/add-member/:memberAddress/:id/:threadName/:email' component={AddMember}/>
                <Route path='/app/accept-invite/:user/:threadId/:threadName' component={JoinCollection}/>
                <Route path='/app/:user/:threadName/:itemId' component={Editor} />
                <Route path='/app/:user/:threadName' component={Collection} />
                <Route path='/app/:user' component={Home} />
                <Route path='/profile' component={Settings} />
                <Route exact path="/" render={() => (<Redirect to="/landing" />)} /> 
            </Switch>

        </Fragment>
    );
}

export default Router;
