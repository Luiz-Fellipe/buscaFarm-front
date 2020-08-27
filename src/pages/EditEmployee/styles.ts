import styled from 'styled-components';
import colors from '~/styles/colors';

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
  padding: 40px 20px;
`;

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const Save = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;
