import styled from "styled-components";
import { Link } from "react-router-dom";

// Layout geral em forma de "card branco"
export const Container = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  margin: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

// Botão principal (ex: "Novo Cliente", "Novo Carro")
export const Button = styled.button`
  background-color: #2ecc71; /* verde claro */
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #27ae60;
  }
`;

// Tabela
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

export const Thead = styled.thead`
  background-color: #2c3e50;
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  color: white;
`;

export const Td = styled.td`
  padding: 0.75rem;
  border-top: 1px solid #ccc;
`;

// Botões de Ação (Editar, Excluir)
export const ActionButton = styled.button`
  background-color: ${(props) =>
    props.cor === "editar"
      ? "#3498db"
      : props.cor === "excluir"
      ? "#e74c3c"
      : "#bdc3c7"};
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

// Formulário
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin-top: 1rem;
`;

export const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
