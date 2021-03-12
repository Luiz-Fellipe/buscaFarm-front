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

export const SubTitle = styled.div`
  width: 70%;
  margin: auto;
  margin-bottom: 60px;

  > span {
    font-weight: bold;

    > a {
      color: ${colors.primary};
    }
  }
`;
