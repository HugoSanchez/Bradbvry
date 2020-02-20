import '../App.css';
import React      from 'react';
import image      from '../resources/pablo-come-back-later.png';

const InstallMetamask = props => {

    return (
        <div className="install-metamask">
            <img src={image} alt=""/>
            <div className="install-metamask-warning">
                <h1>Install Metamask</h1>
                <p>It appears that you don't have Metamask installed. Metamask is a plugin that allows you to control your private keys, and log in.
                <span className="bold"> Please install it <a href="https://metamask.io/">here.</a></span></p>
            </div>
        </div>
    );
}

export default InstallMetamask;
