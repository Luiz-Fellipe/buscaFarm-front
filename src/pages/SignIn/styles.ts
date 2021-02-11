import styled from 'styled-components';
import { Form } from '@unform/web';
import colors from '~/styles/colors';
import Input from '~/components/Input';

export const Container = styled.div`
  background: ${colors.white};
  box-shadow: 0px 0px 10px 10px #00000029;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  width: 100%;
  background: ${colors.white};
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  height: 40%;
  align-items: center;

  img {
    width: 80%;
    height: 80%;
  }
`;

export const FormLogin = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;

  a {
    color: ${colors.primary};
    text-decoration: none;
    margin-bottom: 30px;
  }
`;

export const InputEmail = styled(Input)``;
export const InputPassword = styled(Input)``;

export const DivLeft = styled.div`
  background: #fff;
  display: flex;
  box-shadow: 2px 0px #00000029;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DivRight = styled.div`
  background: ${colors.white};
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;
