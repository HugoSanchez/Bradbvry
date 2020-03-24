import '../App.css';
import React          from 'react';
import {Button}       from './common/Button';
import searching      from '../resources/pablo-searching.png';

const EmptyHome = props => {

    return (
        <div className="install-metamask">
            <img src={searching} alt=""/>
            <div className="install-metamask-warning" id="empty-home">
                <h1>Hi there!</h1>
                <p>It appears that you haven't saved any entries yet. 
                    Click on the button below to start creating new memories.</p>
                <Button id="empty" path={"/editor"} text="New entry" onClick={() => null}/>
            </div>
        </div>
    );
}


export default EmptyHome;
