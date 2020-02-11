import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import clipUploading from '../resources/clipUploading.png';
import Button from './common/Button';
import Header from './common/Header';
import Box from '3box';
import {
    setEthereumAddress_Action, 
    setUserProfile_Action
} from '../actions';
import '../App.css';

const Home = () => {

    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    useEffect(() => {FetchUserProfile()}, [])
    
    const FetchUserProfile = async () => {
        if (typeof window.ethereum == 'undefined') {
            alert('Please install metamask to proceed')
        } else {
            const accounts = await window.ethereum.enable();
            const profile = await Box.getProfile(accounts[0])
            dispatch(setEthereumAddress_Action(accounts[0]))
            dispatch(setUserProfile_Action(profile))
        }
    }

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

export default Home;
