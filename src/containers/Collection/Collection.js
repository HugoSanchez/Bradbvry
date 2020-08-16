import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LoadingCard} from '../../components';
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
  const checkActiveThread = () => {
    if (!threadsArray.length < 1 && !activeThread && items.length < 1) {
      let paramsThreadAddress = `/orbitdb/${threadAddress}/${threadName}`
      let thread = threadsArray.find(thread => thread._address === paramsThreadAddress)
      dispatch(setActiveThread_Action(thread))
    }
  }

  const setThreadItems = () => {
    if (itemsArray.length > 0 && items.length < 1) {
      let threadItems = itemsArray.filter(item => item.threadName === threadName)
      setItems(threadItems)
    }
  }

  /** 
  if (items.length < 1){
    return (
      <LoadingCard />
    )
  }
  */

  return (
    <FlexContainer>
      <LeftContainer>

      </LeftContainer>
      <RightContainer>

      </RightContainer>
    </FlexContainer>
  )
  
}

