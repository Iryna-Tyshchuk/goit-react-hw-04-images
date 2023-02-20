import styled from 'styled-components';

export const Text = styled.p`
  font-size: 18px;
  font-weight: 500;
  text-align: ${({ textAlign }) => (!textAlign ? 'left' : textAlign)};
  margin-bottom: ${({ marginBottom }) => (!marginBottom ? 0 : marginBottom)};
`;
