import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import logo from '../../resources/favicon.png';
import {PointSpreadLoading} from 'react-loadingg';
import {setInitialConfiguration_Action} from '../../actions';

import {LoadingCard} from '../../components';


const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const Collection = props => {

  const history = useHistory();
  const dispatch = useDispatch()

  return (
    <LoadingCard />
  )
}

