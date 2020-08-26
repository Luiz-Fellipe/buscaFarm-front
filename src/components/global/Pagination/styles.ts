import styled from 'styled-components';

interface ButtonPageProps {
  isSelected: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
`;

export const ButtonNextPrev = styled.button``;

export const ButtonPage = styled.button<ButtonPageProps>``;
