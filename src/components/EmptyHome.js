import '../App.css';
import React              from 'react';
import Button             from './common/Button';
import clipUploading      from '../resources/clipUploading.png';

const EmptyHome = props => {

    return (
        <div className="Modal">
            <img src={clipUploading} id="Modal-Image" alt=""/>
            <h1 id="empty-home-title">Hi there!</h1>
            <p id="empty-home-text">It appears that you haven't saved any entries yet.</p>
            <p id="empty-home-text-2"> Click on the button below to start creating new memories.</p>
            <Button id="empty" path={"/editor"} text="New entry" onClick={() => null}/>
        </div>
    );
}

export default EmptyHome;
