import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #2c3e50;
  color: #ffffff;
  padding: 1rem 2rem;
`;

const Nav = styled.nav`
  margin-top: 0.5rem;
  a {
    color: #ffffff;
    margin-right: 1.5rem;
    font-weight: 500;

    &:hover {
      color: #f39c12;
    }
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

export default function Layout({ children }) {
  return (
    <Wrapper>
      <Header>
        <h1>Revenda de Carros</h1>
        <Nav>
          <Link to="/carros">Carros</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/vendas">Vendas</Link>
          <Link to="/Funcionarios">Funcionários</Link>
          <Link to="/auxiliares">Editar Auxiliares</Link>
        </Nav>
      </Header>
      <Main>{children}</Main>
    </Wrapper>
  );
}
