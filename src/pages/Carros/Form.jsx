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

export default function CarroForm() {
  const [carro, setCarro] = useState({
    placa: '',
    chassi: '',
    modelo: '',
    versao: '',
    ano: '',
    quilometragem: '',
    observacoes: '',
    id_cor: '',
    id_status: '',
    id_combustivel: '',
    id_marca: '',
  });

  const [cores, setCores] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [combustiveis, setCombustiveis] = useState([]);
  const [statusVendas, setStatusVendas] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEditando = !!id;

  useEffect(() => {
    // Carregar listas auxiliares
    axios.get('http://localhost:8000/api/cors').then(res => setCores(res.data));
    axios.get('http://localhost:8000/api/marcas').then(res => setMarcas(res.data));
    axios.get('http://localhost:8000/api/combustivels').then(res => setCombustiveis(res.data));
    axios.get('http://localhost:8000/api/statusvendas').then(res => setStatusVendas(res.data));

    // Se for edição, carregar carro
    if (isEditando) {
      axios.get(`http://localhost:8000/api/carros/${id}`).then(response => {
        setCarro(response.data);
      });
    }
  }, [id, isEditando]);

  const handleChange = (e) => {
    setCarro({ ...carro, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const anoAtual = new Date().getFullYear();

  // valida placa
if (!carro.placa || carro.placa.trim().length < 1) {
  return alert('Informe uma placa válida.');
}


  // valida chassi
  if (!carro.chassi || carro.chassi.length !== 17) {
    return alert('O chassi deve conter exatamente 17 caracteres.');
  }

  // modelo
  if (!carro.modelo || carro.modelo.trim().length < 2) {
    return alert('Informe o modelo do carro.');
  }

  // versao
  if (!carro.versao || carro.versao.trim().length < 2) {
    return alert('Informe a versão do carro.');
  }

  // ano
  const ano = parseInt(carro.ano, 10);
  if (!ano || ano < 1900 || ano > anoAtual) {
    return alert(`Ano inválido. Deve ser entre 1900 e ${anoAtual}.`);
  }

  // quilometragem
  const km = parseInt(carro.quilometragem, 10);
  if (!km || km < 0) {
    return alert('Informe uma quilometragem válida.');
  }

  // campos de seleção
  if (!carro.id_cor || !carro.id_marca || !carro.id_combustivel || !carro.id_status) {
    return alert('Preencha todos os campos de seleção (cor, marca, combustível e status).');
  }

  const metodo = isEditando ? 'put' : 'post';
  const url = isEditando
    ? `http://localhost:8000/api/carros/${id}`
    : 'http://localhost:8000/api/carros';

  axios[metodo](url, carro)
    .then(() => navigate('/carros'))
    .catch(error => {
  console.error('Erro ao salvar:', error);
  if (error.response) {
    console.log('Resposta da API:', error.response.data);
    alert('Erro ao salvar: ' + JSON.stringify(error.response.data));
  }
});
};



  return (
    <Container>
      <Titulo>{isEditando ? 'Editar Carro' : 'Cadastrar Novo Carro'}</Titulo>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Placa</Label>
          <Input name="placa"maxLength={7} value= {carro.placa} onChange={(e) => handleChange({ target: { name: 'placa', value: e.target.value.toUpperCase() },})}/>
        </FormGroup>
        <FormGroup>
          <Label>Chassi</Label>
          <Input name="chassi" maxLength={17} value={carro.chassi} onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label>Modelo</Label>
          <Input name="modelo" value={carro.modelo} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Versão</Label>
          <Input name="versao" value={carro.versao} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Ano</Label>
          <Input name="ano" value={carro.ano} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Quilometragem</Label>
          <Input name="quilometragem" value={carro.quilometragem} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Observações</Label>
          <Input name="observacoes" value={carro.observacoes} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label>Cor</Label>
          <Select name="id_cor" value={carro.id_cor || ''} onChange={handleChange}>
            <option value="">Selecione...</option>
            {cores.map(cor => (
              <option key={cor.id_cor} value={cor.id_cor}>{cor.descricao}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Marca</Label>
          <Select name="id_marca" value={carro.id_marca || ''} onChange={handleChange}>
            <option value="">Selecione...</option>
            {marcas.map(m => (
              <option key={m.id_marca} value={m.id_marca}>{m.descricao}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Combustível</Label>
          <Select name="id_combustivel" value={carro.id_combustivel || ''} onChange={handleChange}>
            <option value="">Selecione...</option>
            {combustiveis.map(c => (
              <option key={c.id_combustivel} value={c.id_combustivel}>{c.descricao}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Status</Label>
          <Select name="id_status" value={carro.id_status || ''} onChange={handleChange}>
            <option value="">Selecione...</option>
            {statusVendas.map(s => (
              <option key={s.id_status} value={s.id_status}>{s.descricao}</option>
            ))}
          </Select>
        </FormGroup>

        <Button type="submit">{isEditando ? 'Atualizar' : 'Salvar'}</Button>
      </form>
    </Container>
  );
}
