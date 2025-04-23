// src/components/ClienteList.jsx
import React, {useEffect, useState} from 'react';
import '../styles.css';


const ClienteList = ({ onEditar }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);  // Para controle de carregamento
  const [error, setError] = useState(null);  // Para exibir mensagens de erro

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const response = await fetch('http://localhost:8080/cliente');
      if (!response.ok) {
        throw new Error('Erro ao buscar clientes');
      }
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      setError(error.message);
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const excluirCliente = async (id) => {
    try {
      await fetch(`http://localhost:8080/cliente/${id}`, {
        method: 'DELETE',
      });
      setClientes(clientes.filter(cliente => cliente.id !== id)); // Atualizar a lista após exclusão
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;  // Exibe carregando enquanto busca os dados
  }

  if (error) {
    return <div className="mensagem-erro">{error}</div>;  // Exibe erro caso algo tenha falhado
  }

  return (
    <div className="container">
      <h2>Clientes</h2>
      <ul>
        {clientes.length > 0 ? (
          clientes.map((cliente) => (
            <li key={cliente.id}>
              <span>{cliente.nome} - {cliente.email}</span>
              <div>
              <button onClick={() => onEditar(cliente)}>Editar</button>
              <button onClick={() => excluirCliente(cliente.id)}>Excluir</button>
              </div>
            </li>
          ))
        ) : (
          <li>Não há clientes cadastrados.</li>
        )}
      </ul>
    </div>
  );
};

export default ClienteList;

