import React, { useState, useEffect } from "react";
import '../styles.css';

const ClienteForm = ({ clienteEditando, onSalvar, cancelarEdicao }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
  });

  useEffect(() => {
    console.log("clienteEditando:", clienteEditando);
    if (clienteEditando) {
      setFormData({
        nome: clienteEditando.nome,
        email: clienteEditando.email,
        telefone: clienteEditando.telefone,
        cpf: clienteEditando.cpf,
      });
    } else {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
      });
    }
  }, [clienteEditando]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = clienteEditando
      ? `http://localhost:8080/cliente/${clienteEditando.id}`
      : 'http://localhost:8080/cliente';
    const method = clienteEditando ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ nome: '', email: '', telefone: '', cpf: '' });
        onSalvar(); // Chama a função para atualizar a lista após salvar
      } else {
        console.error('Erro ao salvar cliente');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className="container">
      <h2>{clienteEditando ? 'Editar Cliente' : 'Novo Cliente'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
        <div style={{display: 'flex', gap: '10px'}}>
        <button type="submit">Salvar</button>
        {clienteEditando && (
          <button type="button"
          className="cancelar-btn"
          onClick={() => setFormData({nome: '', email: '', telefone: '', cpf: '' })}>Cancelar</button>
        )}
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;

