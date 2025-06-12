import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
`;

const Titulo = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #2c3e50;
  color: white;
  text-align: left;
  padding: 12px;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f2f2f2;
  }
`;

const Button = styled.button`
  margin-right: 0.5rem;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  color: white;

  &.editar {
    background-color: #3498db;
  }

  &.excluir {
    background-color: #e74c3c;
  }
`;

const NovoButton = styled.button`
  margin-bottom: 1rem;
  background-color: #27ae60;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1e8449;
  }
`;

export default function CombustivelList() {
  const [combustiveis, setCombustiveis] = useState([]);
  const navigate = useNavigate();

  const carregarCombustiveis = () => {
    axios.get('http://localhost:8000/api/combustivels')
      .then(response => setCombustiveis(response.data))
      .catch(error => console.error('Erro ao buscar combustíveis:', error));
  };

  useEffect(() => {
    carregarCombustiveis();
  }, []);

  const handleEditar = (id) => {
    navigate(`/auxiliares/combustivels/editar/${id}`);
  };

  const handleExcluir = (id) => {
    if (confirm('Tem certeza que deseja excluir este combustível?')) {
      axios.delete(`http://localhost:8000/api/combustivels/${id}`)
        .then(() => carregarCombustiveis())
        .catch(err => console.error('Erro ao excluir:', err));
    }
  };

  return (
    <Container>
      <Titulo>Lista de Combustíveis</Titulo>
      <NovoButton onClick={() => navigate('/auxiliares/combustivels/novo')}>
        Novo Combustível
      </NovoButton>
      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Descrição</Th>
            <Th>Ações</Th>
          </Tr>
        </thead>
        <tbody>
          {combustiveis.map((item) => (
            <Tr key={item.id_combustivel}>
              <Td>{item.id_combustivel}</Td>
              <Td>{item.descricao}</Td>
              <Td>
                <Button className="editar" onClick={() => handleEditar(item.id_combustivel)}>Editar</Button>
                <Button className="excluir" onClick={() => handleExcluir(item.id_combustivel)}>Excluir</Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
