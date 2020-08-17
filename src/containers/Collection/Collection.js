import React, {useEffect, useState, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Drawer from '@material-ui/core/Drawer';

import {
  CollectionCardBig,
  UploadImageForm,
  CircularButton,
  LoadingCard,
  ItemsList, 
  Header
} from '../../components';

import {
  setActiveThread_Action, 
  setInitialConfiguration_Action
} from '../../actions';

import {
  FlexContainer,
  LeftContainer,
  RightContainer
} from './styles';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const Collection = props => {

  let {
    threadAddress, 
    threadName
  } = props.match.params

  const dispatch = useDispatch()

  const [items, setItems] = useState([])
  const [renderForm, setRenderForm] = useState(false)

  const threadsArray = useSelector(state => state.threads.threadsArray)
  const itemsArray = useSelector(state => state.threads.itemsArray)
  const activeThread = useSelector(state => state.threads.activeThread)

  useEffect(() => {
    isLoggedIn()
    checkActiveThread()
    setThreadItems()
  })

  // Check if user is logged in. 
  // If not, redirect to sign in url
  // Else handle config.
  const isLoggedIn = async () => {
    let isLogged = await magic.user.isLoggedIn();
    if (!isLogged) { props.history.push(`/signin`)} 
    else { handleConfig() }
  }

  // If state is empty, set initial configuration.
  // Else, make sure selectedThread is properly set,
  // and stop loading.
  const handleConfig = async () => {
    if (threadsArray.length < 1) {
      dispatch(setInitialConfiguration_Action())}
  }

  // Check selectedThread is correct.
  // If activeThread is not set, user is reloading and should be set.
  // Else handle other cases.
  const checkActiveThread = async () => {
    if (!threadsArray.length < 1 && !activeThread && items.length < 1) {
      let paramsThreadAddress = `/orbitdb/${threadAddress}/${threadName}`
	  let thread = threadsArray.find(thread => thread._address === paramsThreadAddress)
      dispatch(setActiveThread_Action(thread))
    }
  }

  // Get all items that belong to the appropriate thread.
  // And set them in state.
  const setThreadItems = () => {
	let threadItems = itemsArray.filter(item => item.threadName === threadName)
    if (threadItems.length !== items.length) {
		console.log('here')
		setItems(threadItems)
    }
  }

  const onImageUpload = () => {
	  setRenderForm()
  }

  console.log(itemsArray)

  if (items.length < 1){
    return (
      <LoadingCard />
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

		<FlexContainer>
			<LeftContainer>
				<CollectionCardBig thread={activeThread} />
			</LeftContainer>
			<RightContainer>
				<ItemsList entries={items} shadow={true}/>
			</RightContainer>
		</FlexContainer>

		<CircularButton
			imageAdd
			size={'25px'}
			bottom={'16.5vh'} 
			onClick={() => setRenderForm(true)}
		/>
		<CircularButton
			quillPen
			size={'25px'}
			onClick={() => setRenderForm(true)}
		/>
    </Fragment>
    
  )
  
}

