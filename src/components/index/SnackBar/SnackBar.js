
import React from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import {primaryGreen, primaryGray75} from '../../../constants/colors';

export const StyledToastContainer = styled(ToastContainer).attrs({
	className: 'toast-container',
	toastClassName: 'toast',
	bodyClassName: 'body',
	progressClassName: 'progress',
  })`
  .Toastify__toast-container {}
  .Toastify__toast {}
  .Toastify__toast--error {
	background-color: rgb(232, 142, 142);
	color: ${primaryGray75};
	  font-family: Montserrat;
	  font-size: 14px;
  }
  .Toastify__toast--warning {}
  .Toastify__toast--success {
	  background-color: ${primaryGreen};
	  color: ${primaryGray75};
	  font-family: Montserrat;
	  font-size: 14px;
  }
  .Toastify__toast-body {}
  .Toastify__progress-bar {}
`;
