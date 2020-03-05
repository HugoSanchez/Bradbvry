import '../App.css';
import React      from 'react';
import image      from '../resources/pablo-come-back-later.png';

const InstallMetamask = props => {

    return (
        <div className="install-metamask">
            <img src={image} alt=""/>
            <div className="install-metamask-warning">
                <h1>Please enable Metamask</h1>
                <p>It appears that you don't have Metamask enabled or installed.
                <span className="bold"> Please install it <a href="https://metamask.io/">here.</a></span></p>
            </div>
        </div>
    );
}

export default InstallMetamask;
