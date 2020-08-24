import styled from 'styled-components';
import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 120px;
`;

export const ArrowLeftTop = styled.div`
  .button,
  .head {
    display: block;
    background: ${colors.primary};
    transition: all 0.3s ease;
  }
  .head {
    height: 100px;
    width: 20px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .button {
    height: 20px;
    width: 100px;
    position: relative;
  }

  .setup {
    margin-top: 10px;
    width: 15px;
    height: 125px;
  }
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
  margin-top: 10px;
  justify-content: center;
`;

export const User = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

export const Password = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;
`;

export const Forgot = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 90px;

  span {
    color: ${colors.primary};
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 16px;
  }
`;

export const Login = styled.div`
  display: flex;
  position: relative;

  span {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #fff;
  }
`;

export const ArrowRightBottom = styled.div`
  .button-two,
  .head-two {
    display: block;
    background: ${colors.primary};
    transition: all 0.3s ease;
  }
  .head-two {
    height: 100px;
    width: 20px;
    position: absolute;
    bottom: 0;
    right: 0px;
  }
  .button-two {
    height: 20px;
    width: 100px;
    position: relative;
  }

  .setup-two {
    margin: 630px -80px;
    width: 125px;
    height: 41px;
  }
`;
