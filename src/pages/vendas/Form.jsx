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

export default function VendaForm() {
  const [venda, setVenda] = useState({
    valor: '',
    data_venda: '',
    id_cliente: '',
    id_funcionario: '',
    id_carro: '',
    id_forma_pagamento: '',
  });

  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [carros, setCarros] = useState([]);
  const [formasPagamento, setFormasPagamento] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditando = !!id;

  useEffect(() => {
    axios.get('http://localhost:8000/api/clientes').then(res => setClientes(res.data));
    axios.get('http://localhost:8000/api/funcionarios').then(res => setFuncionarios(res.data));
    axios.get('http://localhost:8000/api/carros').then(res => setCarros(res.data));
    axios.get('http://localhost:8000/api/formapagamentos').then(res => setFormasPagamento(res.data));

    if (isEditando) {
      axios.get(`http://localhost:8000/api/vendas/${id}`).then(res => setVenda(res.data));
    }
  }, [id, isEditando]);

  const handleChange = (e) => {
    setVenda({ ...venda, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(venda.data_venda) > new Date()) {
      alert("A data da venda não pode ser futura.");
      return;
    }

    if (!venda.valor || venda.valor <= 0) {
      alert("Informe um valor válido.");
      return;
    }

    const metodo = isEditando ? 'put' : 'post';
    const url = isEditando
      ? `http://localhost:8000/api/vendas/${id}`
      : 'http://localhost:8000/api/vendas';

    axios[metodo](url, venda)
      .then(() => navigate('/vendas'))
      .catch(err => {
        console.error(err);
        alert('Erro ao salvar a venda.');
      });
  };

  return (
    <Container>
      <Titulo>{isEditando ? 'Editar Venda' : 'Nova Venda'}</Titulo>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Cliente</Label>
          <Select name="id_cliente" value={venda.id_cliente} onChange={handleChange}>
            <option value="">Selecione...</option>
            {clientes.map(cli => (
              <option key={cli.id_cliente} value={cli.id_cliente}>{cli.nome}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Funcionário</Label>
          <Select name="id_funcionario" value={venda.id_funcionario} onChange={handleChange}>
            <option value="">Selecione...</option>
            {funcionarios.map(func => (
              <option key={func.id_funcionario} value={func.id_funcionario}>{func.nome}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Carro</Label>
          <Select name="id_carro" value={venda.id_carro} onChange={handleChange}>
            <option value="">Selecione...</option>
            {carros.map(carro => (
              <option key={carro.id_carro} value={carro.id_carro}>{carro.placa}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Forma de Pagamento</Label>
          <Select name="id_forma_pagamento" value={venda.id_forma_pagamento} onChange={handleChange}>
            <option value="">Selecione...</option>
            {formasPagamento.map(fp => (
              <option key={fp.id_forma_pagamento} value={fp.id_forma_pagamento}>{fp.descricao}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Data da Venda</Label>
          <Input type="date" name="data_venda" value={venda.data_venda} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label>Valor</Label>
          <Input type="number" name="valor" value={venda.valor} onChange={handleChange} step="0.01" />
        </FormGroup>

        <Button type="submit">{isEditando ? 'Atualizar' : 'Salvar'}</Button>
      </form>
    </Container>
  );
}
