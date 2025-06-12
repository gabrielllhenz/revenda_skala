import styled from 'styled-components';

const Button = styled.button`
  background-color: #f39c12;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: darken(#f39c12, 10%);
  }
`;

export default Button;
