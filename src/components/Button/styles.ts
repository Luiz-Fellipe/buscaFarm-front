import styled from 'styled-components';
import colors from '~/styles/colors';

export const ButtonPrimary = styled.button`

    padding: 10px 50px;
    border: none;

    background: ${colors.primary};
    border-radius: 15px;

    > span {

    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #fff;

    }
  }
`;
