import React, { useState, useEffect } from "react";
import '../styles.css';
import axios from "axios";


const ReservaForm = ({ reservaEditando, onSalvar, cancelarEdicao }) => {
    const [formData, setFormData] = useState({
      clienteId: '',
      locacaoId: '',
      dataInicio: '',
      dataFim: '',
      valorFinal: '',
      situacao: ''
    });

    const [clientes, setClientes] = useState([]);
    const [locacoes, setLocacoes] = useState([]);
  
    useEffect(() => {
      if (reservaEditando) {
        setFormData(reservaEditando);
      } else {
        setFormData({
          cliente: '',
          locacao: '',
          dataInicio: '',
          dataFim: '',
          valorFinal: '',
          situacao: ''
        });
      }
    }, [reservaEditando]);

    const buscarClientes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cliente");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };
  
    const buscarLocacoes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/locacao");
        setLocacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar locações:", error);
      }
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = reservaEditando
            ? `http://localhost:8080/reserva/${reservaEditando.id}`
            : 'http://localhost:8080/reserva';

        const method = reservaEditando ? 'PUT' : 'POST';

        try {
          await axios[method](url, formData);
          onSalvar();
          setFormData({
            cliente: '',
            locacao: '',
            dataInicio: '',
            dataFim: '',
            valorFinal: '',
            situacao: ''
          });
        } catch (error) {
          console.error("Erro ao salvar reserva:", error);
        }
      };
    
      return (
        <div className="container">
          <h2>{reservaEditando ? "Editar Reserva" : "Cadastrar Nova Reserva"}</h2>
    
          <form onSubmit={handleSubmit}>
            <select name="clienteId" value={formData.clienteId} onChange={handleChange}>
              <option value="">Selecione o Cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
    
            <select name="locacaoId" value={formData.locacaoId} onChange={handleChange}>
              <option value="">Selecione a Locação</option>
              {locacoes.map((locacao) => (
                <option key={locacao.id} value={locacao.id}>
                  {locacao.nome}
                </option>
              ))}
            </select>
    
            <input
              name="dataInicio"
              type="date"
              value={formData.dataInicio}
              onChange={handleChange}
            />
            <input
              name="dataFim"
              type="date"
              value={formData.dataFim}
              onChange={handleChange}
            />
            <input
              name="valorFinal"
              type="number"
              value={formData.valorFinal}
              onChange={handleChange}
              placeholder="Valor Final"
            />
            <input
              name="situacao"
              value={formData.situacao}
              onChange={handleChange}
              placeholder="Situação"
            />
    
            <button type="submit">
              {reservaEditando ? "Atualizar" : "Cadastrar"}
            </button>
    
            {reservaEditando && (
              <button type="button" onClick={cancelarEdicao} className="cancelar-btn">
                Cancelar Edição
              </button>
            )}
          </form>
        </div>
      );
    };
    
    export default ReservaForm;