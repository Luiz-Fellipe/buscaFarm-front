import styled from 'styled-components';
import { shade } from 'polished';
import colors from '~/styles/colors';
import Input, { InputProps } from '~/components/Input';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-top: 50px;
  margin-bottom: 70px;
`;
export const Title = styled.div`
  span {
    font-size: 36px;
    font-weight: bold;
    color: ${colors.black};
  }
`;
export const ButtonBackAndSave = styled.div`
  display: flex;

  button {
    margin-left: 30px;
  }
`;

export const Container = styled.div`
  position: relative;
  padding: 40px 20px;
`;

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  > fieldset {
    border: none;
  }
`;

export const Save = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
`;

export const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  left: 50%;
  top: -120px;
  margin: 0;
  border: 3px solid ${colors.primary};
  position: absolute;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};

  img {
    width: 145px;
    height: 145px;
    border-radius: 50%;
    object-fit: cover;
    background-color: ${colors.body};
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: ${colors.primary};
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: ${colors.white};
    }

    &:hover {
      background: ${shade(0.2, colors.primary)};
    }
  }
`;

export const InputProfile = styled(Input)<InputProps>`
  width: 100% !important;
`;
