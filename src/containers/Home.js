import React, {Component}       from 'react';
import {connect}                from 'react-redux';
import {PointSpreadLoading}     from 'react-loadingg';
import ItemsContainer           from '../components/ItemsContainer';
import InstallMetamask          from '../components/InstallMetamask';
import ProfileCard              from '../components/ProfileCard';
import {Mixpanel}               from '../utils';
import '../App.css';

import {CircularButton, Header} from '../components/common';
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
        this.mounted = true;
        await this.handleMetamaskException()
        if (!this.props.space) {this.setInitialSessionConfig()}

    }

    async shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.items.length > 0 && this.state.loading == true) {
            this.setState({loading: false})}
    }

    async componentWillUnmount() {
        this.mounted = false;
    }

    async handleMetamaskException(){
        if (typeof window.ethereum == 'undefined') {
        this.setState({renderMetamask: true})} 
    }

    async setInitialSessionConfig() {
        this.props.setInitialConfiguration_Action()
        Mixpanel.track('New Session')
    }

    render() {

        const {items, profile, history} = this.props
        const {loading, renderMetamask} = this.state
        
        return (
            <div>
                <Header />
                <div className="Main">
                    <div className="home-container">
                        {renderMetamask && !profile && <InstallMetamask /> }
                        {!loading && <ItemsContainer items={items} />}
                        {loading && !renderMetamask && <PointSpreadLoading color={"rgb(190, 235, 194)"} />}
                        
                        {
                            !loading && profile && 
                            !renderMetamask && items.length > 0 && 
                            <ProfileCard profile={profile} />
                        }

                        {
                            !loading && 
                                <CircularButton 
                                    onClick={() => history.push('/editor')}
                                    plus={true} 
                                    path="/editor"
                                    iconId="home-add-entry-circular-button-icon"
                                    buttonId="home-add-entry-circular-button"
                                />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state.threads.itemsArray)
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

