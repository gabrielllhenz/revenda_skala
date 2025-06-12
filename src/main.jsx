
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import Layout from './components/Layout';

import CarroList from './pages/Carros/List';
import CarroForm from './pages/Carros/Form';

import ClienteList from './pages/clientes/List';
import ClienteForm from './pages/clientes/Form';

import FuncionarioList from './pages/Funcionarios/List';
import FuncionarioForm from './pages/Funcionarios/Form';

import Auxiliares from './pages/Auxiliares';
import EditarAuxiliares from './pages/Auxiliares/EditarAuxiliares';


import CorList from './pages/Auxiliares/cor/List';
import CorForm from './pages/Auxiliares/cor/Form';

import MarcaList from './pages/Auxiliares/marca/List';
import MarcaForm from './pages/Auxiliares/marca/Form';

import CombustivelList from './pages/Auxiliares/combustivel/List';
import CombustivelForm from './pages/Auxiliares/combustivel/Form';

import FormaPagamentoList from './pages/Auxiliares/forma_pagamento/List';
import FormaPagamentoForm from './pages/Auxiliares/forma_pagamento/Form';

import StatusVendaList from './pages/Auxiliares/Status_Venda/List';
import StatusVendaForm from './pages/Auxiliares/status_venda/Form';

import CargoList from './pages/Auxiliares/cargo/List';
import CargoForm from './pages/Auxiliares/cargo/Form';

import VendaList from './pages/vendas/List';
import VendaForm from './pages/vendas/Form';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          {/* Carros */}
          <Route path="/" element={<CarroList />} />
          <Route path="/carros" element={<CarroList />} />
          <Route path="/carros/novo" element={<CarroForm />} />
          <Route path="/carros/editar/:id" element={<CarroForm />} />

          {/* Clientes */}
          <Route path="/clientes" element={<ClienteList />} />
          <Route path="/clientes/novo" element={<ClienteForm />} />
          <Route path="/clientes/editar/:id" element={<ClienteForm />} />

          {/* Funcionários */}
          <Route path="/funcionarios" element={<FuncionarioList />} />
          <Route path="/funcionarios/novo" element={<FuncionarioForm />} />
          <Route path="/funcionarios/editar/:id" element={<FuncionarioForm />} />

          {/* Auxiliares */}
          <Route path="/auxiliares" element={<Auxiliares />} />
          <Route path="/auxiliares" element={<EditarAuxiliares />} />

          {/* Auxiliares - Cor */}
          <Route path="/auxiliares/cors" element={<CorList />} />
          <Route path="/auxiliares/cors/novo" element={<CorForm />} />
          <Route path="/auxiliares/cors/editar/:id" element={<CorForm />} />

          {/* Auxiliares - Marca */}
          <Route path="/auxiliares/marcas" element={<MarcaList />} />
          <Route path="/auxiliares/marcas/novo" element={<MarcaForm />} />
          <Route path="/auxiliares/marcas/editar/:id" element={<MarcaForm />} />

          {/* Auxiliares - Combustível */}
          <Route path="/auxiliares/combustivels" element={<CombustivelList />} />
          <Route path="/auxiliares/combustivels/novo" element={<CombustivelForm />} />
          <Route path="/auxiliares/combustivels/editar/:id" element={<CombustivelForm />} />

          {/* Auxiliares - Forma Pagamento */}
          <Route path="/auxiliares/forma_pagamentos" element={<FormaPagamentoList />} />
          <Route path="/auxiliares/forma_pagamentos/novo" element={<FormaPagamentoForm />} />
          <Route path="/auxiliares/forma_pagamentos/editar/:id" element={<FormaPagamentoForm />} />

          {/* Auxiliares - Status Venda */}
          <Route path="/auxiliares/status_vendas" element={<StatusVendaList />} />
          <Route path="/auxiliares/status_vendas/novo" element={<StatusVendaForm />} />
          <Route path="/auxiliares/status_vendas/editar/:id" element={<StatusVendaForm />} />

          {/* Auxiliares - Cargos */}
          <Route path="/auxiliares/cargos" element={<CargoList />} />
          <Route path="/auxiliares/cargos/novo" element={<CargoForm />} />
          <Route path="/auxiliares/cargos/editar/:id" element={<CargoForm />} />

          {/* Vendas */}
          <Route path="/vendas" element={<VendaList />} />
          <Route path="/vendas/novo" element={<VendaForm />} />
          <Route path="/vendas/editar/:id" element={<VendaForm />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
