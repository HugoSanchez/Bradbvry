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

    // Function to develop further.
    // Trigers a different render if no metamask is available.
    async handleMetamaskException(){
        if (typeof window.ethereum == 'undefined') {
        this.setState({renderMetamask: true})} 
    }
    
    // Check wether a session has started (space is set)
    // Either fetch items or set session config.
    async getSessionConfigAndSetItems(){
        if (this.props.space) { await this.fetchAndSetUserItems() } 
        else {this.setInitialSessionConfig()}
    }

    // Fetch and set user entries (items) 
    // in global redux store. 
    async fetchAndSetUserItems() {
        this.setState({loading: false, renderMetamask: false})
        let privThread = await this.props.space.joinThread('bradbvry--def--private--thread')
        let posts = await privThread.getPosts()
        let parsedItems = await this.parseSpaceItems(posts)
        if (parsedItems.length !== this.props.items.length) {
            this.props.setUserItems(parsedItems)
        }
    }

    // Instantiate box, space and fetch user profile and data.
    // Then set state in global redux store.
    async setInitialSessionConfig() {
        let accounts    = await window.ethereum.enable();
        this.setState({renderMetamask: false})
        let box         = await Box.openBox(accounts[0], window.ethereum)
        let space       = await box.openSpace('bradbvry--main')
        let threads     = await space.subscribedThreads()
        let profile     = await Box.getProfile(accounts[0])

        // Get User private thread posts and set them in state.
        let privThread  = await space.joinThread('bradbvry--def--private--thread')
        let posts       = await privThread.getPosts()
        let parsedItems = await this.parseSpaceItems(posts)
        console.log('PARSED POSTS: ', parsedItems)
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
    

    // Helper function to parse every entry item
    // into a JSON and push it into an array. 
    // Returns sorted array, should be inproved.
    async parseSpaceItems(posts){
        posts.forEach(post => post.message = JSON.parse(post.message))
        return posts.sort((a, b) => {
           return parseInt(b.timestamp) - parseInt(a.timestamp)
        });
    }


    render() {
        const {items, profile} = this.props
        const {loading, renderMetamask} = this.state

        console.log('ITEMS: ', items)
        
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
                                    onPress={() => console.log('CLICK')}
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
    console.log('STATE: ', state)
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
        setUserData: (data) => dispatch(setInitialUserData_Action(data)),
        setUserItems: (items) => dispatch(setUserItems_Action(items)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

