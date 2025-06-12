import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Titulo = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background-color: #ecf0f1;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background-color: #d0d3d4;
  }
`;

export default function EditarAuxiliares() {
  const navigate = useNavigate();

  const itens = [
    { nome: 'Cores', rota: '/auxiliares/cores' },
    { nome: 'Marcas', rota: '/auxiliares/marcas' },
    { nome: 'Combustíveis', rota: '/auxiliares/combustiveis' },
    { nome: 'Formas de Pagamento', rota: '/auxiliares/formas-pagamento' },
    { nome: 'Status de Venda', rota: '/auxiliares/status-venda' },
    { nome: 'Cargos', rota: '/auxiliares/cargos' },
  ];

  return (
    <Container>
      <Titulo>Editar Tabelas Auxiliares</Titulo>
      <Grid>
        {itens.map((item, i) => (
          <Card key={i} onClick={() => navigate(item.rota)}>
            {item.nome}
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
