import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  background-color: #fff;
  padding: 2rem;
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

export default function CorList() {
  const [cores, setCores] = useState([]);
  const navigate = useNavigate();

  const carregarCores = () => {
    axios.get('http://localhost:8000/api/cors')
      .then(response => setCores(response.data))
      .catch(error => console.error('Erro ao buscar cores:', error));
  };

  useEffect(() => {
    carregarCores();
  }, []);

  const handleEditar = (id) => {
    navigate(`/auxiliares/cors/editar/${id}`);
  };

  const handleExcluir = (id) => {
    if (confirm('Tem certeza que deseja excluir esta cor?')) {
      axios.delete(`http://localhost:8000/api/cors/${id}`)
        .then(() => carregarCores())
        .catch(err => console.error('Erro ao excluir:', err));
    }
  };

  return (
    <Container>
      <Titulo>Lista de Cores</Titulo>
      <NovoButton onClick={() => navigate('/auxiliares/cors/novo')}>
        Nova Cor
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
          {cores.map((cor) => (
            <Tr key={cor.id_cor}>
              <Td>{cor.id_cor}</Td>
              <Td>{cor.descricao}</Td>
              <Td>
                <Button className="editar" onClick={() => handleEditar(cor.id_cor)}>Editar</Button>
                <Button className="excluir" onClick={() => handleExcluir(cor.id_cor)}>Excluir</Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}