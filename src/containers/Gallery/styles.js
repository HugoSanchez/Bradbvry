import styled from 'styled-components';
import {primaryGreen, primaryGray45} from '../../constants/colors';
import {device} from '../../constants';
import {Title} from '../../components';


export const ColTitle = styled(Title)`
    color: ${primaryGray45};
    font-weight: 600;
    font-size: 5vh;
    text-transform: capitalize; 
    @media ${device.mobileL} {
        font-size: 5vh;
    }
`