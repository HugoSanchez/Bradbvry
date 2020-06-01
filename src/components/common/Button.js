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
    return (
            <ButtonLayout 
                shadow={props.shadow}
                onClick={props.onClick}
                backgroundColor={props.backgroundColor}>
                <Text 
                    fontWeight='500'
                    textAlign='center'
                    color={props.textColor ? props.textColor : 'white'}>
                    {props.text}
                </Text>
            </ButtonLayout>
    );
}

const SimpleEmptyButton = props => {
    return (
            <EmptyButtonLayout 
                shadow={props.shadow}
                onClick={props.onClick}
                backgroundColor={props.backgroundColor}>
                <Text 
                    fontWeight='500'
                    textAlign='center'
                    color={props.textColor ? props.textColor : 'white'}>
                    {props.text}
                </Text>
            </EmptyButtonLayout>
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
    box-shadow: ${props => props.shadow ? '0 0 5px rgba(0,0,0,0.2)' : null}; 
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'rgb(185, 185, 185)'}; 
    &:hover{
        opacity: 0.9; 
    }
`;

const EmptyButtonLayout = styled.div`
    margin: 10px;
    padding-bottom: 10px;
    min-height: 40px;
    max-height: 50px;
    min-width: 140px;
    max-width: 140px;
    padding-top: 0.7rem;
    border-radius: 0.3rem;
    box-shadow: ${props => props.shadow ? '0 0 5px rgba(0,0,0,0.2)' : null}; 
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'rgb(185, 185, 185)'}; 
    border-width: 1px;
    border-style: solid;
    border-color: rgb(155, 155, 155);
    &:hover{
        opacity: 0.9; 
    }
`;

export {Button, SimpleButton, SimpleEmptyButton};
