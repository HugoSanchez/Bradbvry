import React, {Component}       from 'react';
import {connect}                from 'react-redux';
import {PointSpreadLoading}     from 'react-loadingg';
import CircularButton           from './common/CircularButton';
import ItemsContainer           from './ItemsContainer';
import InstallMetamask          from './InstallMetamask';
import ProfileCard              from './ProfileCard';
import Header                   from './common/Header';
import Box                      from '3box';
import {
    setInitialUserData_Action,
    setUserItems_Action
}                               from '../actions';
import '../App.css';

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
        this.setState({loading: false})
        let rawitems    = await this.props.space.private.all()
        let parseditems = await this.parseSpaceItems(rawitems)
        if (parseditems.length == this.props.items.length) {
            this.props.setUserItems(parseditems)
        }
    }

    // Instantiate box, space and fetch user profile and data.
    // Then set state in global redux store.
    async setInitialSessionConfig() {
        let accounts    = await window.ethereum.enable();
        let box         = await Box.openBox(accounts[0], window.ethereum)
        let space       = await box.openSpace('bradbvry--main')
        let profile     = await Box.getProfile(accounts[0])
        let rawitems    = await space.private.all()
        let parseditems = await this.parseSpaceItems(rawitems)
        this.setState({loading: false})
        this.props.setUserData({
            box, 
            space, 
            profile, 
            parseditems, 
            accounts
        })       
    }

    // Helper function to parse every entry item
    // into a JSON and push it into an array.
    async parseSpaceItems(items){
        let array = [];
        for (let item in items) {
             let object = {}
             let element = items[item]
             let parsedEl = JSON.parse(element)
             object[item.toString()] = parsedEl
             array.push(object)       
        }
        return array;
    }

    render() {
        console.log(this.props.profile)
        const {items, profile} = this.props
        const {loading, renderMetamask} = this.state
        
        return (
            <div>
                <Header />
                <div className="Main">
                    <div className="home-container">
                        {renderMetamask && !loading && <InstallMetamask /> }
                        {!loading && <ItemsContainer items={items} />}
                        {loading && <PointSpreadLoading color={"rgb(190, 235, 194)"} />}
                        {profile && !renderMetamask && items.length > 0 && <ProfileCard profile={profile} />}

                        {
                            !loading && 
                                <CircularButton 
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
        items:      state.user.data.parseditems,
        profile:    state.user.data.profile
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        setUserData: (data) => dispatch(setInitialUserData_Action(data)),
        setUserItems: (items) => dispatch(setUserItems_Action(items)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

