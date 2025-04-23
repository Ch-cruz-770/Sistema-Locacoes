import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocacaoForm = ({ locacaoEditando, onSalvar, cancelarEdicao }) => {
  const [locacao, setLocacao] = useState({
  
    nome: '',
    tipo: '',
    descricao: '',
    valorHora: '',
    tempoMinimo: '',
    tempoMaximo: ''
  });

  useEffect(() => {
    if (locacaoEditando) {
      setLocacao(locacaoEditando);
    } else {
      setLocacao({
        nome: '',
        tipo: '',
        descricao: '',
        valorHora: '',
        tempoMinimo: '',
        tempoMaximo: ''
      });
    }
  }, [locacaoEditando]);

  const handleChange = (e) => {
    setLocacao({
      ...locacao,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (locacaoEditando) {
        await axios.put(`http://localhost:8080/locacao/${locacaoEditando.id}`, locacao);
      } else {
        await axios.post('http://localhost:8080/locacao', locacao);
      }
    
    onSalvar();
    setLocacao({
      nome: '',
      tipo: '',
      descricao: '',
      valorHora: '',
      tempoMinimo: '',
      tempoMaximo: ''
    });
  } catch (error) {
    console.error('Erro ao salvar Locação: ', error);
  }
  };

  return (
    <div className="container">
      <h2>{locacaoEditando ? 'Editar Locação' : 'Cadastrar Nova Locação'}</h2>

      <form onSubmit={handleSubmit}>
        <input name="nome" value={locacao.nome} onChange={handleChange} placeholder="Nome do tipo" />
        <input name="tipo" value={locacao.tipo} onChange={handleChange} placeholder="Tipo" />
        <textarea name="descricao" value={locacao.descricao} onChange={handleChange} placeholder="Descrição" />
        <input name="valorHora" value={locacao.valorHora} onChange={handleChange} placeholder="Valor por hora" type="number" />
        <input name="tempoMinimo" value={locacao.tempoMinimo} onChange={handleChange} placeholder="Tempo mínimo (em horas)" type="number" />
        <input name="tempoMaximo" value={locacao.tempoMaximo} onChange={handleChange} placeholder="Tempo máximo (em horas)" type="number" />

        <button type="submit">{locacaoEditando ? 'Atualizar' : 'Cadastrar'}</button>
        {locacaoEditando && (
          <button type="button" onClick={cancelarEdicao} className="cancelar-btn">
            Cancelar Edição
            </button>
          )}
      </form>
    </div>
  );
};

export default LocacaoForm;


