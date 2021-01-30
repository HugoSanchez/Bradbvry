import styled from 'styled-components';

export const RightContainer = styled.div`
    flex: 3;
    overflow: ${props => props.overflow ? 'hidden' : null}
`;