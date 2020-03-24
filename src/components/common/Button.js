import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';

/**
 * @param {path}: where to route on click if any.
 * @param {text}: text to display. 
 * @param {onClick}: function to execute on click if any. 
 */


const Button = props => {

    return (
        <Link to={props.path} style={{textDecoration: 'none', justifyItems: 'center'}} onClick={props.onClick}>
            <div className="Button" id={props.id}>
                <h5 className="Button-text" id={props.textId}>{props.text}</h5>
            </div>
        </Link>
    );
}

export {Button};
