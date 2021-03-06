import React from 'react';
import styled from 'styled-components';
import {primaryGreen } from '../../constants/colors';
import {WaveLoading} from 'react-loadingg';


/**
 * @param {isActive}: bool, wether or not to render.
 * @param {isModerator}: if user has "write"-access to the item.
 * @param {onClick}: function to execute on click if any. 
 */

const LoadingCardBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const size = window.innerWidth < 400 ? 18 : 22

const LoadingToast = props => {

    return (
        <LoadingCardBox>
            <WaveLoading 
                speed={2}
                size='small'
                color={primaryGreen} />
        </LoadingCardBox>
    );
}

export {LoadingToast};
