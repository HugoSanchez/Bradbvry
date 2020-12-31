import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Dropzone from 'react-dropzone';
import {Mixpanel} from '../../utils';
import {ThreadID} from '@textile/hub';

import {
	FlexContainer,
	LeftContainer,
	RightContainer,
	CollectionButtons,
	CollectionCardBig,
	UploadImageForm,
	AddMemberForm,
	LoadingCard,
	ItemsList, 
	SnackBar,
	Header
} from '../../components';

import {
	setActiveItem_Action,
	setActiveThread_Action, 
	setThreadItems_Action,
	addItemToThreadItems_Action,
	handleSaveImage_Action,
	setInitialConfiguration_Action
} from '../../actions';

import {
	DropZoneCont
} from './styles';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const Collection = props => {
	
	Mixpanel.track('COLLECTION');

	let {
		threadAddress, 
		threadName
	} = props.match.params

	const dispatch = useDispatch()

	// Try to fix this:
	// This makes the component re-render everytime the modal is opened and closed.
	const [loading, setLoading] = useState(true)
	const [renderForm, setRenderForm] = useState(false) 
	const [renderMemberForm, setRenderMemberForm] = useState(false) 
	const [openSnack, setOpenSnack] = useState('')
	const [uploadSuccess, setUploadSuccess] = useState(false)
	const [message, setMessage] = useState(null)
	const [isModerator, setIsModerator] = useState(false)

	const client = useSelector(state => state.user.client)
	const address = useSelector(state => state.user.address)
	const threadsArray = useSelector(state => state.threads.threadsArray)
	const threadItems = useSelector(state => state.threads.threadItems)
	const activeThread = useSelector(state => state.threads.activeThread)

	useEffect(() => {
		// Check if user is logged in. 
		// If not, redirect to sign in url
		// Else handle config.
		const isLoggedIn = async () => {
			let isLogged = await magic.user.isLoggedIn();
			if (!isLogged) { props.history.push(`/signin`)} 
			else { handleConfig() }
		}
		isLoggedIn()
	}, [])

	useEffect(() => {
		// Check selectedThread is correct.
		// If activeThread is not set, user is reloading and should be set.
		const checkActiveThread = async () => {
			if (!activeThread && threadsArray.length > 0) {
				let thread = threadsArray.find(thread => thread.name === threadName)
				dispatch(setActiveThread_Action(thread))
				await fetchThreadData(thread)
			}
		}
		checkActiveThread()
	})
	
	const fetchThreadData = async (thread) => {
		// If selected thread exists, 
		// Fetch entries and set up listener
		let threadId = ThreadID.fromString(thread.id)
		let items = await client.find(threadId, 'entries', {})
		dispatch(setThreadItems_Action(items.reverse()))
		setLoading(false)

		await client.listen(threadId, [], (e) => {
			if (e === undefined) {return}
			if (e.action === 'CREATE') {
				let item = e.instance
				dispatch(addItemToThreadItems_Action(item))
				return
			}			
		})
	}
	
	
	const handleConfig = async () => {
		// If state is empty, set initial configuration.
		// Else, make sure selectedThread is properly set.
		if (threadsArray.length < 1) {
		dispatch(setInitialConfiguration_Action())}
		else {setLoading(false)}
	}
	
	const handleShowSnackbar = bool => {
		if (bool) {setMessage('Success !')}
		else {setMessage('Something went wrong, please try again.')}
	
        setUploadSuccess(bool)
        setOpenSnack('show')
        setTimeout(() => setOpenSnack(''), 4000)
	}
	
	const handleCloseMemberForm = bool => {
		handleShowSnackbar(bool)
		setRenderMemberForm(false)
	}

	const handleNewEditor = async () => {
		dispatch(setActiveItem_Action(null))
		props.history.push('/editor', {onlyRead: !isModerator})
	}

	const onImageUpload = () => {
		setRenderForm(false)
	}
	
	const onDrop = (files) => {
		dispatch(handleSaveImage_Action({files}))
	}

	if (loading){
		return (
			<Fragment>
				<Header />
				<LoadingCard />
			</Fragment>
		)
	}


  	return (
		<Fragment>
			<Header />
			<Drawer 
				anchor={'right'} 
				open={renderForm} 
				onClose={() => setRenderForm(false)} >
					<UploadImageForm onClose={() => onImageUpload()}/>
			</Drawer>

			<Drawer 
				anchor={'right'} 
				open={renderMemberForm} 
				onClose={() => setRenderMemberForm(false)} >
					<AddMemberForm onClose={(bool) => handleCloseMemberForm(bool)}/>
			</Drawer>

			<SnackBar 
				className={openSnack} 
				success={uploadSuccess} 
				message={message}
			/>

				<Dropzone 
					onDrop={onDrop}
					accept={'image/jpeg, image/png, image/gif'}
					maxSize={20000000}
					multiple={true}>

					{({getRootProps, getInputProps}) => (
						<DropZoneCont {...getRootProps()}>
							<input {...getInputProps()} />

							<FlexContainer>
								<LeftContainer>
									<CollectionCardBig thread={activeThread} />
								</LeftContainer>

								<RightContainer>
									<ItemsList 
										items={threadItems} 
										shadow={true} 
										isModerator={isModerator}/>
								</RightContainer>
							</FlexContainer>

						</DropZoneCont>
					)}
				</Dropzone>

			<CollectionButtons 
				addMember={() => setRenderMemberForm(true)}
				addImage={() => setRenderForm(true)}
				openEditor={() => handleNewEditor}
				activeThread={activeThread}/>

		</Fragment>
  	)
}

