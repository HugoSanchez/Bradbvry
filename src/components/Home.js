import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Box from '3box';
import {setEthereumAddress_Action} from '../actions';

import Header from './common/Header';
import CustomModal from './common/Modal';
import clipUploading from '../resources/clipUploading.png';
import gmEmpty from '../resources/gm(1).png';
import Button from './common/Button';
import '../App.css';

const Home = ({props, dispatch}) => {

    const [entries, setEntries] = useState([]); 
    const [renderModal, setRenderModal] = useState(false);

    const getAddressFromMetamask = async () => {
        if (typeof window.ethereum == 'undefined') {
            alert('Please install metamask to proceed')
        } else {
            const accounts = await window.ethereum.enable();
            const box = await Box.openBox(accounts[0], window.ethereum)
            const profile = await Box.getProfile(accounts[0])
            const space = await box.openSpace('bradbvry-main')
            console.log('Accounts: ', accounts)
            console.log('profile: ', profile)
            dispatch(setEthereumAddress_Action(accounts[0]))
        }
    }

    useEffect(() => {
        getAddressFromMetamask()
        if (entries.length < 1) { setRenderModal(true)} else {setRenderModal(false)}
    })
    
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

export default connect(state => ({
    user: state.user
}))(Home);
