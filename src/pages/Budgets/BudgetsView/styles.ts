import styled from 'styled-components';
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
  padding: 40px 20px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CreatedAt = styled.div`
  display: flex;
  align-items: center;

  .title-header {
    font-size: 20px;
    font-weight: bold;
  }
  #created-at {
    margin-left: 5px;
    color: ${colors.primary};
    font-size: 18px;
    font-weight: bold;
  }
`;
export const UpdatedAt = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  .title-header {
    font-size: 20px;
    font-weight: bold;
  }

  #updated-at {
    margin-left: 5px;
    color: ${colors.primary};
    font-size: 18px;
    font-weight: bold;
  }
`;

export const BudgetsInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 80px;
`;
export const HeaderBudgets = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border: 2px solid ${colors.primary};
  padding: 10px;
  text-align: center;
  font-weight: bold;
`;
export const GridListBudgets = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border-left: 2px solid ${colors.primary};
  border-right: 2px solid ${colors.primary};
  padding: 10px;
  text-align: center;
`;

export const Total = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border: 2px solid ${colors.primary};
  padding: 10px;
  text-align: center;
  font-weight: bold;
`;

export const InfoUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55%;
  height: 250px;
  border: 2px solid ${colors.primary};
  position: relative;
  margin-top: 170px;
  border-radius: 10px;
`;

export const User = styled.div`
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
`;

export const DataUser = styled.div``;

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  > fieldset {
    border: none;
  }
`;

export const InputProfile = styled(Input)<InputProps>`
  width: 100% !important;
`;

export const PhoneNumber = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

export const ContainerList = styled.div`
  max-height: 280px;
  overflow: auto;
`;
