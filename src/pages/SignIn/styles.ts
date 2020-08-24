import styled from 'styled-components';
import { Form } from '@unform/web';
import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  background: white;
  width: 600px;
  height: 600px;
  padding: 0px 40px;
  margin-top: 30px;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
`;

export const FormLogin = styled(Form)`
  display: flex;
  width: 100%;
  height: 70%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  > a {
    text-decoration: none;
    color: ${colors.primary};
    font-weight: bold;
  }
`;
