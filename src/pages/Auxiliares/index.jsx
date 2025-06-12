import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
`;

const Titulo = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background-color: #ecf0f1;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background-color: #d0d7de;
  }
`;

const auxiliares = [
  { nome: 'Cores', path: '/auxiliares/cors' },
  { nome: 'Marcas', path: '/auxiliares/marcas' },
  { nome: 'Combustíveis', path: '/auxiliares/combustivels' },
  { nome: 'Formas de Pagamento', path: '/auxiliares/forma_pagamentos' },
  { nome: 'Cargos', path: '/auxiliares/cargos' },
  { nome: 'Status de Venda', path: '/auxiliares/status_vendas' },
];


export default function AuxiliaresPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Titulo>Editar Tabelas Auxiliares</Titulo>
      <Grid>
        {auxiliares.map(aux => (
          <Card key={aux.nome} onClick={() => navigate(aux.path)}>
            {aux.nome}
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
