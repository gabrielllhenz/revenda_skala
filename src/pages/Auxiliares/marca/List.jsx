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
  font-size: 1.5rem;
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

export default function MarcaList() {
  const [marcas, setMarcas] = useState([]);
  const navigate = useNavigate();

  const carregarMarcas = () => {
    axios.get('http://localhost:8000/api/marcas')
      .then(res => setMarcas(res.data))
      .catch(err => console.error('Erro ao buscar marcas:', err));
  };

  useEffect(() => {
    carregarMarcas();
  }, []);

  const handleEditar = (id) => {
    navigate(`/auxiliares/marcas/editar/${id}`);
  };

  const handleExcluir = (id) => {
    if (confirm('Tem certeza que deseja excluir esta marca?')) {
      axios.delete(`http://localhost:8000/api/marcas/${id}`)
        .then(() => carregarMarcas())
        .catch(err => console.error('Erro ao excluir:', err));
    }
  };

  return (
    <Container>
      <Titulo>Lista de Marcas</Titulo>
      <NovoButton onClick={() => navigate('/auxiliares/marcas/novo')}>
        Nova Marca
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
          {marcas.map((marca) => (
            <Tr key={marca.id_marca}>
              <Td>{marca.id_marca}</Td>
              <Td>{marca.descricao}</Td>
              <Td>
                <Button className="editar" onClick={() => handleEditar(marca.id_marca)}>Editar</Button>
                <Button className="excluir" onClick={() => handleExcluir(marca.id_marca)}>Excluir</Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
