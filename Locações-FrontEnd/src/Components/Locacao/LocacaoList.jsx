import React, { useEffect, useState } from 'react';
import '../styles.css';

const LocacaoList = ({ onEditar, atualizar }) => {
  const [locacoes, setLocacoes] = useState([]);

  useEffect(() => {
    carregarLocacoes();
  }, [atualizar]);

  // Carrega os dados do backend
  const carregarLocacoes = () => {
    fetch('http://localhost:8080/locacao')
      .then(response => response.json())
      .then(data => setLocacoes(data))
      .catch(error => console.error('Erro ao carregar locações:', error));
  };

  const excluirLocacao = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este tipo de locação?')) {
      fetch(`http://localhost:8080/locacao/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            setLocacoes(locacoes.filter(locacao => locacao.id !== id));
          } else {
            console.error('Erro ao excluir tipo de locação');
          }
        });
    }
  };

  return (
    <div className="tela">
      <h2>Tipos de Locação</h2>

      <div className="tabela-container">
        <table className="tabela-escura">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {locacoes.map(locacao => (
              <tr key={locacao.id}>
                <td>{locacao.nome}</td>
                <td>{locacao.descricao}</td>
                <td>
                  <button onClick={() => onEditar(locacao)}>Editar</button>
                  <button className="cancelar" onClick={() => excluirLocacao(locacao.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocacaoList;
