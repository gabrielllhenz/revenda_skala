import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Styled Components
const Container = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
`;

const Titulo = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
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

export default function ClienteForm() {
  const [cliente, setCliente] = useState({
    nome: '',
    cpf: '',
    endereco: '',
    telefone: '',
    email: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditando = !!id;

  useEffect(() => {
    if (isEditando) {
      axios.get(`http://localhost:8000/api/clientes/${id}`).then(res => {
        setCliente(res.data);
      });
    }
  }, [id, isEditando]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cliente.nome || cliente.nome.length < 3) return alert('Informe o nome.');
    if (!cliente.cpf || cliente.cpf.length !== 11) return alert('CPF deve ter 11 dígitos.');
    if (!cliente.endereco) return alert('Informe o endereço.');
    if (!cliente.telefone) return alert('Informe o telefone.');
    if (!cliente.email || !cliente.email.includes('@')) return alert('Informe um email válido.');

    const metodo = isEditando ? 'put' : 'post';
    const url = isEditando
      ? `http://localhost:8000/api/clientes/${id}`
      : 'http://localhost:8000/api/clientes';

    axios[metodo](url, cliente)
      .then(() => navigate('/clientes'))
      .catch(err => {
        if (err.response && err.response.status === 422) {
          const erros = err.response.data.errors;

          if (erros.CPF?.[0]?.includes('já está em uso')) {
            alert('Atenção! O campo CPF deve ser único, CPF digitado já em uso.');
          } else {
            const mensagens = Object.values(erros).flat().join('\n');
            alert(mensagens);
          }
        } else {
          console.error('Erro ao salvar:', err);
          alert('Erro inesperado. Veja o console.');
        }
      });
  };

  return (
    <Container>
      <Titulo>{isEditando ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}</Titulo>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome</Label>
          <Input name="nome" value={cliente.nome} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>CPF</Label>
          <Input name="cpf" maxLength={11} value={cliente.cpf} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Endereço</Label>
          <Input name="endereco" value={cliente.endereco} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Telefone</Label>
          <Input name="telefone" value={cliente.telefone} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input name="email" value={cliente.email} onChange={handleChange} />
        </FormGroup>
        <Button type="submit">{isEditando ? 'Atualizar' : 'Salvar'}</Button>
      </form>
    </Container>
  );
}
