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

export default function CarroList() {
  const [carros, setCarros] = useState([]);
  const navigate = useNavigate();

  const carregarCarros = () => {
    axios.get('http://localhost:8000/api/carros')
      .then(response => setCarros(response.data))
      .catch(error => console.error('Erro ao buscar carros:', error));
  };

  useEffect(() => {
    carregarCarros();
  }, []);

  const handleEditar = (id) => {
    navigate(`/carros/editar/${id}`);
  };

  const handleExcluir = (id) => {
    if (confirm('Tem certeza que deseja excluir este carro?')) {
      axios.delete(`http://localhost:8000/api/carros/${id}`)
        .then(() => carregarCarros())
        .catch(err => console.error('Erro ao excluir:', err));
    }
  };

  return (
    <Container>
      <Titulo>Lista de Carros</Titulo>
      <NovoButton onClick={() => navigate('/carros/novo')}>
        Novo Carro
      </NovoButton>
      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Placa</Th>
            <Th>Chassi</Th>
            <Th>Modelo</Th>
            <Th>Versão</Th>
            <Th>Ano</Th>
            <Th>Km</Th>
            <Th>Cor</Th>
            <Th>Marca</Th>
            <Th>Combustível</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </Tr>
        </thead>
        <tbody>
          {carros.map((carro) => (
            <Tr key={carro.id_carro}>
              <Td>{carro.id_carro}</Td>
              <Td>{carro.placa}</Td>
              <Td>{carro.chassi}</Td>
              <Td>{carro.modelo}</Td>
              <Td>{carro.versao}</Td>
              <Td>{carro.ano}</Td>
              <Td>{carro.quilometragem}</Td>
              <Td>{carro.cor?.descricao}</Td>
              <Td>{carro.marca?.descricao}</Td>
              <Td>{carro.combustivel?.descricao}</Td>
              <Td>{carro.status?.descricao}</Td>
              <Td>
                <Button className="editar" onClick={() => handleEditar(carro.id_carro)}>
                  Editar
                </Button>
                <Button className="excluir" onClick={() => handleExcluir(carro.id_carro)}>
                  Excluir
                </Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
