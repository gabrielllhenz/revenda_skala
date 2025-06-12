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

export default function VendaList() {
  const [vendas, setVendas] = useState([]);
  const navigate = useNavigate();

  const carregarVendas = () => {
    axios.get('http://localhost:8000/api/vendas')
      .then(res => setVendas(res.data))
      .catch(err => console.error('Erro ao buscar vendas:', err));
  };

  useEffect(() => {
    carregarVendas();
  }, []);

  const handleEditar = (id) => {
    navigate(`/vendas/editar/${id}`);
  };

  const handleExcluir = (id) => {
    if (confirm('Tem certeza que deseja excluir esta venda?')) {
      axios.delete(`http://localhost:8000/api/vendas/${id}`)
        .then(() => carregarVendas())
        .catch(err => console.error('Erro ao excluir:', err));
    }
  };

  return (
    <Container>
      <Titulo>Lista de Vendas</Titulo>
      <NovoButton onClick={() => navigate('/vendas/novo')}>
        Nova Venda
      </NovoButton>
      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Cliente</Th>
            <Th>Funcionário</Th>
            <Th>Carro</Th>
            <Th>Forma de Pagamento</Th>
            <Th>Data</Th>
            <Th>Valor</Th>
            <Th>Ações</Th>
          </Tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <Tr key={venda.id_venda}>
              <Td>{venda.id_venda}</Td>
              <Td>{venda.cliente?.nome}</Td>
              <Td>{venda.funcionario?.nome}</Td>
              <Td>{venda.carro?.placa}</Td>
              <Td>{venda.forma_pagamento?.descricao}</Td>
              <Td>{venda.data_venda}</Td>
              <Td>R$ {parseFloat(venda.valor).toFixed(2)}</Td>
              <Td>
                <Button className="editar" onClick={() => handleEditar(venda.id_venda)}>Editar</Button>
                <Button className="excluir" onClick={() => handleExcluir(venda.id_venda)}>Excluir</Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
