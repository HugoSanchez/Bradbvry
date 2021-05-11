import React, {useEffect, useState, Fragment} from 'react';
import {useHistory} from "react-router-dom";
import {parseToDisplayCollectionName} from '../../utils';
import logo from '../../resources/favicon.png';

import {
	useSelector, 
	useDispatch
} from 'react-redux';

import {
	SnackBar,
	LoadingCard
} from '../../components';

import {
    Logo, 
    Title, 
    Text,
    Button,
	ButtonText,
	SignInCard,
} from './styles';

import {
	handleAddCollection_Action,
	setInitialConfiguration_Action
} from '../../actions';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const AddMember = props => {

    let {
		id,
		email,
		threadName,
		memberAddress,
	} = props.match.params
	
	const dispatch = useDispatch()
    const history = useHistory();
	const [loading, setLoading] = useState(true)

	const client = useSelector(state => state.user.client)
	const identity = useSelector(state => state.user.identity)
	const collectionName = parseToDisplayCollectionName(threadName)


    useEffect(() => {
		const checkLoginAndRedirect = async () => {
			let isLogged = await magic.user.isLoggedIn();
			if (!isLogged) {history.push(`/signin`, {redirect: props.match.url})} 
			else if (!client) { dispatch(setInitialConfiguration_Action(handleSetLoading))}
		}
      	checkLoginAndRedirect()},
    [history, dispatch, props.match.url])

	const handleSetLoading = () => {
		return setLoading(false)
	}
    

    const handleConfirmMember = async e => {
		setLoading(true)
		let data = await magic.user.getMetadata()
		let details = {id, email, threadName, memberAddress}
		dispatch(handleAddCollection_Action(details))
    }

	
	if (loading) {
		return (
			<Fragment>
				<LoadingCard />
			</Fragment>
		)
	}

    return (
		<Fragment>
			
			<SignInCard>
				<Logo src={logo} alt=''/>
				<Title>Confirm New Membership</Title>
				<Text>
					<span style={{fontWeight: 600}}>{email} </span> 
					has accepted your invitation to join 
					<span style={{fontWeight: 600, whiteSpace: 'pre'}}>{' ' + collectionName}. </span>     
				</Text>
				
				<Button type="submit" onClick={handleConfirmMember}>
					<ButtonText>Confirm Membership</ButtonText>
				</Button>
			</SignInCard>
		</Fragment>
    )
}

