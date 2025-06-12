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

export default function FuncionarioList() {
  const [funcionarios, setFuncionarios] = useState([]);
  const navigate = useNavigate();

  const carregarFuncionarios = () => {
    axios.get('http://localhost:8000/api/funcionarios')
      .then(response => setFuncionarios(response.data))
      .catch(error => console.error('Erro ao buscar funcionários:', error));
  };

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const handleEditar = (id) => {
    navigate(`/funcionarios/editar/${id}`);
  };

  const handleExcluir = (id) => {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      axios.delete(`http://localhost:8000/api/funcionarios/${id}`)
        .then(() => carregarFuncionarios())
        .catch(err => console.error('Erro ao excluir:', err));
    }
  };

  return (
    <Container>
      <Titulo>Lista de Funcionários</Titulo>
      <NovoButton onClick={() => navigate('/funcionarios/novo')}>
        Novo Funcionário
      </NovoButton>
      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>CPF</Th>
            <Th>Telefone</Th>
            <Th>Email</Th>
            <Th>Endereço</Th>
            <Th>Salário</Th>
            <Th>Admissão</Th>
            <Th>ID Cargo</Th>
            <Th>Ações</Th>
          </Tr>
        </thead>
        <tbody>
          {funcionarios.map((f) => (
            <Tr key={f.id_funcionario}>
              <Td>{f.id_funcionario}</Td>
              <Td>{f.nome}</Td>
              <Td>{f.CPF}</Td>
              <Td>{f.telefone}</Td>
              <Td>{f.email}</Td>
              <Td>{f.endereco}</Td>
              <Td>{f.salario}</Td>
              <Td>{f.data_admissao}</Td>
              <Td>{f.cargo?.descricao}</Td>
              <Td>
                <Button className="editar" onClick={() => handleEditar(f.id_funcionario)}>Editar</Button>
                <Button className="excluir" onClick={() => handleExcluir(f.id_funcionario)}>Excluir</Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
