import React, {Component}       from 'react';
import {connect}                from 'react-redux';
import {PointSpreadLoading}     from 'react-loadingg';

import {
    CircularButton,
    Header
}                               from '../components/common';

import {
    setInitialUserData_Action,
    setActiveThread_Action,
    setUserItems_Action
}                               from '../actions';

import ItemsContainer           from '../components/ItemsContainer';
import InstallMetamask          from '../components/InstallMetamask';
import ProfileCard              from '../components/ProfileCard';
import Box                      from '3box';
import {Mixpanel}               from '../utils';
import '../App.css';

import {
    globalThreadModeratorAddress,
    threadObj
} from '../constants';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true, 
            renderMetamask: true,
        }
    }

    async componentDidMount(){
        this.mounted = true;
        await this.handleMetamaskException()
        await this.getSessionConfigAndSetItems()
    }

    async componentWillUnmount() {
        this.mounted = false;
    }

    async handleMetamaskException(){
        if (typeof window.ethereum == 'undefined') {
        this.setState({renderMetamask: true})} 
    }
    
    async getSessionConfigAndSetItems(){
        if (this.props.space) { await this.fetchAndSetUserItems() } 
        else {this.setInitialSessionConfig()}
    }

    async fetchAndSetUserItems() {
        this.setState({loading: false, renderMetamask: false})
        let {parsedItems} = await this.getThreadAndPosts(this.props.space)
        this.props.setUserItems(parsedItems)
    }

    async setInitialSessionConfig() {
        let accounts    = await window.ethereum.enable();
        this.setState({renderMetamask: false})
        console.log(accounts[0])
        let box         = await Box.openBox(accounts[0], window.ethereum)
        console.log('Box: ', box)
        let space       = await box.openSpace('bradbvry--main')
        console.log('Space: ', space)
        let threads     = await space.subscribedThreads()
        console.log('Threads: ', threads)
        let profile     = await Box.getProfile(accounts[0])
        console.log('Profile: ', profile)
        let thread = await space.joinThreadByAddress('/orbitdb/zdpuAyUzNeQ4y7L8iYV52iGFE6KdBed47ju3TJWUBNAu9Ytho/3box.thread.bradbvry--main.bradbvry--def--private--thread')
        console.log(thread)
        let {privThread, parsedItems} = await this.getThreadAndPosts(space)
        console.log('Parsed: ', parsedItems)
        this.props.setActiveThread(privThread)
        
        Mixpanel.identify(profile.proof_did.slice(0, 32))
        Mixpanel.track('New Session')

        this.props.setUserData({
            box, 
            space, 
            profile,
            threads, 
            parsedItems, 
            accounts
        }) 

        this.setState({loading: false})   
    }

    async getThreadAndPosts(space) {
        /**
        console.log('1')
        let privThread  = await space.joinThread('bradbvry--def--private--thread')
        console.log('2')
        let posts       = await privThread.getPosts()
        console.log('3')
        let parsedItems = await this.parseSpaceItems(posts)
        console.log('4')
        return {privThread, parsedItems}
         */
    }

    async parseSpaceItems(posts){
        return posts.sort((a, b) => {
           return parseInt(b.message.timestamp) - parseInt(a.message.timestamp)
        });
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
                        {profile && !renderMetamask && items.length > 0 && <ProfileCard profile={profile} />}

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
    return {
        box:        state.user.data.box,
        space:      state.user.data.space,
        items:      state.user.data.parsedItems,
        profile:    state.user.data.profile,
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        setActiveThread: (thread) => dispatch(setActiveThread_Action(thread)),
        setUserData: (data)       => dispatch(setInitialUserData_Action(data)),
        setUserItems: (items)     => dispatch(setUserItems_Action(items)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

