import React, {Component, Fragment}       from 'react';
import {connect}                          from 'react-redux';
import ItemsAndSpaces                     from '../components/ItemsAndSpaces';
import ProfileCard                        from '../components/ProfileCard';
import {LoadingCard}                        from '../components';
import {Mixpanel}                         from '../utils';
import '../App.css';

import {Header} from '../components/common';
import {setInitialConfiguration_Action} from '../actions';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true, 
            renderMetamask: false,
        }
    }

    async componentDidMount(){
        let isLogged = await magic.user.isLoggedIn();
        if (!isLogged) { this.props.history.push(`/signin`)} 
        else {this.handleConfig()}
    }

    async shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.space && this.state.loading === true) {
            this.setState({loading: false})
        }
    }

    async handleConfig(){
        if (!this.props.space) {this.props.setInitialConfiguration_Action()}
        else if (this.props.space && this.props.items.length > 0) {this.setState({loading: false})}
    }

    render() {

        const {items, profile} = this.props
        const {loading} = this.state

        return (
            <div>
                <Header />
                <div className="Main">

                    <div className="home-container">
                        {loading && <LoadingCard />}
                        
                        {   
                            !loading && profile && 
                            items.length > 0 && 
                            <Fragment>
                                <ItemsAndSpaces items={items} />
                                <ProfileCard profile={profile} />
                            </Fragment>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        box:        state.user.data.box,
        space:      state.user.data.space,
        items:      state.threads.itemsArray,
        profile:    state.user.data.profile,
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        setInitialConfiguration_Action: () => {
            dispatch(setInitialConfiguration_Action())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

