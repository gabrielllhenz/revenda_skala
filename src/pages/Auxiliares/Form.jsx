import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  text-transform: capitalize;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #2c3e50;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1a242f;
  }
`;

export default function AuxiliarForm({ entidadeApi, rotaUrl }) {
  const [item, setItem] = useState({ descricao: '' });
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditando = !!id;

  useEffect(() => {
    if (isEditando) {
      axios.get(`http://localhost:8000/api/${entidadeApi}/${id}`)
        .then(res => setItem(res.data))
        .catch(err => console.error(err));
    }
  }, [id, isEditando, entidadeApi]);

  const handleChange = (e) => {
    setItem({ ...item, descricao: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!item.descricao.trim()) {
      alert('Informe uma descrição válida.');
      return;
    }

    const metodo = isEditando ? 'put' : 'post';
    const url = isEditando
      ? `http://localhost:8000/api/${entidadeApi}/${id}`
      : `http://localhost:8000/api/${entidadeApi}`;

    axios[metodo](url, item)
      .then(() => navigate(`/auxiliares/${rotaUrl}`))
      .catch(err => {
        if (err.response?.status === 422) {
          alert('Descrição já existente. Use um nome único.');
        } else {
          console.error(err);
          alert('Erro ao salvar. Verifique se a descrição é única.');
        }
      });
  };

  return (
    <Container>
      <Titulo>{isEditando ? 'Editar' : 'Novo'} {rotaUrl.replace('_', ' ')}</Titulo>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Descrição</Label>
          <Input
            name="descricao"
            value={item.descricao}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">{isEditando ? 'Atualizar' : 'Salvar'}</Button>
      </form>
    </Container>
  );
}
