import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import logo from '../../resources/favicon.png';
import {setInitialConfiguration_Action} from '../../actions';


import {
    SignInCard,
    Logo, 
    Title, 
    Text,
    Input,
    Button,
    ButtonText
} from './styles';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const SignIn = props => {

    const history = useHistory();
    const dispatch = useDispatch()

    const handleLogin = async e => {
        e.preventDefault();

        dispatch(setInitialConfiguration_Action())
        const email = new FormData(e.target).get("email");

        if (email) {
          await magic.auth.loginWithMagicLink({ email });
          await magic.user.isLoggedIn();

          let data = await magic.user.getMetadata()
          history.push(`/app/${data.publicAddress}`)
        }
    }

    return (
      <SignInCard>
        <Logo src={logo} alt=''/>
        <Title>Hey, welcome!</Title>
        <Text>
            Enter your email here to either log in or sign up. 
            The process might take a few seconds, so please be patient.
        </Text>
        <form 
          autocomplete="off" 
          onSubmit={handleLogin}>
          <Input 
            type="email" 
            name="email" 
            required="required"
            autocomplete="off" 
            placeholder="thomas.pynchon@email.com" />
          <br></br>
          <Button type="submit">
            <ButtonText>Sign In</ButtonText>
          </Button>
        </form>
      </SignInCard>
    )
}

