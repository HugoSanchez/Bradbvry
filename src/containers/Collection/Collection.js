import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LoadingCard} from '../../components';
import {
  setActiveThread_Action, 
  setInitialConfiguration_Action
} from '../../actions';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const Collection = props => {

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const threadsArray = useSelector(state => state.threads.threadsArray)
  const activeThread = useSelector(state => state.threads.activeThread)

  useEffect(() => {
    isLoggedIn()
    checkActiveThread()
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
    else {
      // console.log('here')
      // checkActiveThread()
      setLoading(false)
    }
  }

  // Check selectedThread is correct.
  // If activeThread is not set, user is reloading and should be set.
  // Else handle other cases.
  const checkActiveThread = async () => {
    if (!threadsArray.length < 1 && !activeThread && loading) {
      let {threadAddress, threadName} = props.match.params
      let paramsThreadAddress = `/orbitdb/${threadAddress}/${threadName}`
      
      let thread = threadsArray.find(thread => thread._address === paramsThreadAddress)
      dispatch(setActiveThread_Action(thread))
    }
  }

  return (
    <LoadingCard />
  )
}

