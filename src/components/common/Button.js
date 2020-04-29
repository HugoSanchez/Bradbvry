import React from 'react';
import {Link} from 'react-router-dom';
import {Text} from './Text';
import styled from 'styled-components';
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

const SimpleButton = props => {

    console.log('props: ', props)

    return (
            <ButtonLayout onClick={() => props.onClick}>
                <Text 
                    fontWeight='300'
                    textAlign='center'
                    color='white'>
                    {props.text}
                </Text>
            </ButtonLayout>
    );
}

const ButtonLayout = styled.div`
    margin: 10px;
    padding-bottom: 10px;
    min-height: 40px;
    max-height: 50px;
    min-width: 140px;
    max-width: 140px;
    padding-top: 0.7rem;
    border-radius: 0.3rem;
    box-shadow: 0 0 5px rgba(0,0,0,0.2); 
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'rgb(10, 15, 80)'}; 
    &:hover{
        opacity: 0.9; 
        box-shadow: 0 0 8px rgba(0,0,0,0.2); 
    }
`;

export {Button, SimpleButton};
