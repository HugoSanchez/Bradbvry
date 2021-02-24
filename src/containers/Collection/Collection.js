import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCollectionItemsUrl} from '../../constants';
import Drawer from '@material-ui/core/Drawer';
import Dropzone from 'react-dropzone';
import {ThreadID} from '@textile/hub';
import axios from 'axios';

import {
	useMixpanel,
	useIsOwner,
	useIsLogged
} from '../../hooks'

import {
	FlexContainer,
	LeftContainer,
	RightContainer,
	CollectionButtons,
	CollectionCardBig,
	UploadImageForm,
	AddMemberForm,
	LoadingCard,
	MoreButton,
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
	DropZoneCont,
	MoreOptionsPositioner
} from './styles';

export const Collection = props => {

	let {
		threadName,
		user
	} = props.match.params

	useMixpanel('COLLECTION')

	const dispatch = useDispatch()
	const isLogged = useIsLogged()
	const isOwner  = useIsOwner(user)
	

	// Try to fix this:
	// This makes the component re-render everytime the modal is opened and closed.
	const [loading, setLoading] = useState(true)
	const [renderForm, setRenderForm] = useState(false) 
	const [renderMemberForm, setRenderMemberForm] = useState(false) 
	const [openSnack, setOpenSnack] = useState('')
	const [uploadSuccess, setUploadSuccess] = useState(false)
	const [message, setMessage] = useState(null)

	const client = useSelector(state => state.user.client)
	const threadsArray = useSelector(state => state.threads.threadsArray)
	const threadItems = useSelector(state => state.threads.threadItems)
	const activeThread = useSelector(state => state.threads.activeThread)

	useEffect(() => {
		if (isLogged) {handleComponentConfig()}
		else if (isLogged === false) {fetchThreadEntries()}
	}, [isLogged])

	useEffect(() => {
		// Check selectedThread is correct.
		// If activeThread is not set, 
		// user is reloading and should be set.
		const checkActiveThread = async () => {
			if (!activeThread && threadsArray.length > 0) {
				let thread = threadsArray.find(thread => thread.name === threadName)
				dispatch(setActiveThread_Action(thread))
				await fetchThreadData(thread)
			}
		}
		checkActiveThread()
	}, [activeThread, threadsArray])

	const handleComponentConfig =  async () => {
		// If state is empty, set initial configuration.
		// Else, fetch thread data and set listeners.
		if (isLogged && !client) {dispatch(setInitialConfiguration_Action())}
		else if (isLogged && client) {fetchThreadData(activeThread)}
		else if (isLogged && client && activeThread) {setLoading(false)}
	}

	
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
			}			
		})
	}
	
	

	const fetchThreadEntries = async () => {
		// This functions only gets called if user is not logged.
		// It fetches the collection entries from the backend.
		let fetchUrl = getCollectionItemsUrl(user, threadName)
		let {data} = await axios.get(fetchUrl)
		dispatch(setActiveThread_Action(data.collection[0]))
		dispatch(setThreadItems_Action(data.entries.reverse()))
		setLoading(false)
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
		props.history.push('/editor', {onlyRead: !isOwner})
	}

	const onImageUpload = () => {
		setRenderForm(false)
	}
	
	const onDrop = (files) => {
		const formData = new FormData();
		formData.append('file', files[0]);
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

			<MoreOptionsPositioner>
				<MoreButton 
					isOwner={isOwner}
					history={props.history}/>
			</MoreOptionsPositioner>


				<FlexContainer>
					<LeftContainer>
						<CollectionCardBig
							member={user}
							isOwner={isOwner}
							isLogged={isLogged} 
							thread={activeThread} />
					</LeftContainer>

					<RightContainer>
						<Dropzone 
							onDrop={onDrop}
							accept={'image/jpeg, image/png, image/gif'}
							maxSize={20000000}
							multiple={true}>

							{(
								{getRootProps, getInputProps}) => (
									<DropZoneCont {...getRootProps()}>
										<input {...getInputProps()} />

												<ItemsList 
													shadow={true} 
													items={threadItems} 
													isModerator={isOwner}/>
											
									</DropZoneCont>
							)}
						</Dropzone>
					</RightContainer>
				</FlexContainer>

			<CollectionButtons 

				addMember={() => setRenderMemberForm(true)}
				addImage={() => setRenderForm(true)}
				openEditor={() => handleNewEditor}
				activeThread={activeThread}
				isOwner={isOwner}/>

		</Fragment>
  	)
}

