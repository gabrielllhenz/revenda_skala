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

const Select = styled.select`
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

export default function FuncionarioForm() {
  const [funcionario, setFuncionario] = useState({
    nome: '',
    CPF: '',
    telefone: '',
    email: '',
    endereco: '',
    salario: '',
    data_admissao: '',
    id_cargo: '',
  });

  const [cargos, setCargos] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditando = !!id;

  useEffect(() => {
    axios.get('http://localhost:8000/api/cargos').then(res => setCargos(res.data));

    if (isEditando) {
      axios.get(`http://localhost:8000/api/funcionarios/${id}`).then(res => {
        setFuncionario(res.data);
      });
    }
  }, [id, isEditando]);

  const handleChange = (e) => {
    setFuncionario({ ...funcionario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!funcionario.nome) return alert('Informe o nome.');
    if (!funcionario.CPF || funcionario.CPF.length !== 11) return alert('CPF deve ter 11 dígitos.');
    if (!funcionario.telefone) return alert('Informe o telefone.');
    if (!funcionario.email || !funcionario.email.includes('@')) return alert('Informe um e-mail válido.');
    if (!funcionario.salario || isNaN(funcionario.salario) || funcionario.salario <= 0) return alert('Salário inválido.');
    if (!funcionario.data_admissao) return alert('Informe a data de admissão.');
    if (!funcionario.id_cargo) return alert('Selecione um cargo.');

    const metodo = isEditando ? 'put' : 'post';
    const url = isEditando
      ? `http://localhost:8000/api/funcionarios/${id}`
      : 'http://localhost:8000/api/funcionarios';

    axios[metodo](url, funcionario)
      .then(() => navigate('/funcionarios'))
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
      <Titulo>{isEditando ? 'Editar Funcionário' : 'Cadastrar Novo Funcionário'}</Titulo>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome</Label>
          <Input name="nome" value={funcionario.nome} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>CPF</Label>
          <Input name="CPF" maxLength={11} value={funcionario.CPF} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Telefone</Label>
          <Input name="telefone" value={funcionario.telefone} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input name="email" value={funcionario.email} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Endereço</Label>
          <Input name="endereco" value={funcionario.endereco} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Salário</Label>
          <Input name="salario" value={funcionario.salario} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Data de Admissão</Label>
          <Input type="date" name="data_admissao" value={funcionario.data_admissao} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Cargo</Label>
          <Select name="id_cargo" value={funcionario.id_cargo} onChange={handleChange}>
            <option value="">Selecione...</option>
            {cargos.map(c => (
              <option key={c.id_cargo} value={c.id_cargo}>{c.descricao}</option>
            ))}
          </Select>
        </FormGroup>
        <Button type="submit">{isEditando ? 'Atualizar' : 'Salvar'}</Button>
      </form>
    </Container>
  );
}
