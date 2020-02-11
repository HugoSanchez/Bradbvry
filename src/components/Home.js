import React, {Component} from 'react';
import {connect} from "react-redux";
import clipUploading from '../resources/clipUploading.png';
import Button from './common/Button';
import Header from './common/Header';
import Box from '3box';
import {
    setEthereumAddress_Action, 
    setUserProfile_Action
} from '../actions';
import '../App.css';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            renderMetamaskModal: false,
        }
    }

    /**
     *      const spaceData = await space.private.all()
            console.log('Space Data: ', spaceData)
     */

    async componentWillMount(){
        await this.handleMetamask()
        await this.fetchUserProfile()
    }

    async handleMetamask() {
        if (typeof window.ethereum == 'undefined') {
            this.setState({renderMetamaskModal: true})} 
        else {

            let accounts = await window.ethereum.enable();
            setEthereumAddress_Action(accounts[0])

        }
    }
    
    async fetchUserProfile() {
        let {address} = this.state
        let profile = await Box.getProfile(address)
        setUserProfile_Action(profile)
    }

    render() {
        return (
            <div className="App">
                <Header />
                <div className="Main">
                    <div className="Modal">
                        <img src={clipUploading} id="Modal-Image" />
                        <h1 id="empty-home-title">Hi there!</h1>
                        <p id="empty-home-text">It appears that you haven't saved any entries yet.</p>
                        <p id="empty-home-text-2"> Click on the button below to start creating new memories.</p>
                        <Button id="empty" path={"/editor"} text="New entry" onClick={() => console.log('YEP!!')}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.user.profile
})
  
const mapDispatchToProps = dispatch => ({
    setEthereumAddress_Action: add => dispatch(setEthereumAddress_Action(add)),
    setUserProfile_Action: profile => dispatch(setUserProfile_Action(profile))   
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

