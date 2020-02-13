import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';
import Editor from './components/Editor';
import Home from './components/Home';
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
                        <Route path='/editor' component={Editor} />
                        <Route path='/' component={Home} />
                    </Switch>
                </Provider>
            </main>
        );
    }
}

export default App;
