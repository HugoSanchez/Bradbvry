import React, {Component, Fragment}       from 'react';
import {connect}                          from 'react-redux';
import {PointSpreadLoading}               from 'react-loadingg';
import ItemsAndSpaces                     from '../components/ItemsAndSpaces';
import InstallMetamask                    from '../components/InstallMetamask';
import ProfileCard                        from '../components/ProfileCard';
import {Mixpanel}                         from '../utils';
import '../App.css';

import {Header} from '../components/common';
import {setInitialConfiguration_Action} from '../actions';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true, 
            renderMetamask: false,
        }
    }

    async componentDidMount(){
        await this.handleMetamaskException()
        if (!this.props.space) {this.setInitialSessionConfig()}
        else {this.setState({loading: false})}
    }

    async shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.space && this.state.loading === true) {
            console.log('here')
            this.setState({loading: false})}
    }

    async handleMetamaskException(){
        if (typeof window.ethereum === 'undefined') {
        this.setState({renderMetamask: true})} 
    }

    async setInitialSessionConfig() {
        this.props.setInitialConfiguration_Action()
    }

    render() {

        const {items, profile} = this.props
        const {loading, renderMetamask} = this.state

        console.log('I rendered!')

        console.log('loading: ', !loading)
        console.log('profile: ', !!profile)
        console.log(profile)
        console.log('render Metamask: ', !renderMetamask)
        console.log('Items: ', items.length)
        console.log(items)
        
        return (
            <div>
                <Header />
                <div className="Main">

                    <div className="home-container">
                        {renderMetamask && !profile && <InstallMetamask /> }
                        {loading && console.log(loading)  && <PointSpreadLoading color={"rgb(190, 235, 194)"} />}
                        
                        {   
                            !loading && profile && 
                            !renderMetamask && items.length > 0 && 
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

