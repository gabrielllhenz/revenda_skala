import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Titulo = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

const Lista = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  margin-bottom: 1rem;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #2c3e50;

    &:hover {
      color: #1a242f;
    }
  }
`;

export default function AuxiliaresList() {
  return (
    <Container>
      <Titulo>Editar Tabelas Auxiliares</Titulo>
      <Lista>
        <Item><Link to="/auxiliares/cor">Cor</Link></Item>
        <Item><Link to="/auxiliares/marca">Marca</Link></Item>
        <Item><Link to="/auxiliares/combustivel">Combustível</Link></Item>
        <Item><Link to="/auxiliares/forma_pagamento">Forma de Pagamento</Link></Item>
        <Item><Link to="/auxiliares/cargo">Cargo</Link></Item>
        <Item><Link to="/auxiliares/statusvenda">Status da Venda</Link></Item>
      </Lista>
    </Container>
  );
}