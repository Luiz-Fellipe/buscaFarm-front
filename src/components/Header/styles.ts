import styled from 'styled-components';
import colors from '~/styles/colors';

export const HeaderApplication = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 10px 0px;
  background: #fffcfb;
`;

export const Logo = styled.div`
  display: flex;
  width: 10%;
  margin-left: 50px;
  border-right: 1px solid ${colors.border};

  img {
    width: auto;
    height: auto;
    cursor: pointer;
  }
`;

export const Navigation = styled.div`
  display: flex;
  width: 68%;
  margin-left: 30px;

  h5 {
    color: ${colors.primary};
    font-size: 14px;
    font-weight: bold;
    line-height: 16px;
    cursor: pointer;
  }

  span {
    font-size: 14px;
    font-weight: bold;
    line-height: 16px;
    margin-left: 30px;
    cursor: pointer;
  }

  a {
    color: ${colors.black};
    font-size: 14px;
    font-weight: bold;
    line-height: 16px;
    margin-left: 30px;
    cursor: pointer;
    text-decoration: none;
  }
  a.active {
    color: ${colors.primary};
  }
`;

export const NameProfile = styled.div`
  display: flex;
  width: 11%;
  margin-right: 10px;
  border-right: 1px solid ${colors.border};

  div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-right: 5px;

    h5 {
      font-size: 14px;
      line-height: 16px;
    }

    span {
      display: flex;
      justify-content: flex-end;
      font-size: 12px;
      line-height: 16px;
      color: ${colors.gray};
    }
    div {
      img {
        display: flex;
      }
    }
  }
`;

export const NotificationsAndLogout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;

  img {
    margin-right: 30px;
    cursor: pointer;
  }
`;
