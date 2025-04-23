import React, { useEffect, useState } from "react";
import ReservaForm from "./ReservaForm";
import '../styles.css';

const ReservaList = () => {
    const [reservas, setReservas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [locacoes, setLocacoes] = useState([]);
    const [reservaEditando, setReservaEditando] = useState(null);
  
    useEffect(() => {
      carregarReservas();
      carregarClientes();
      carregarLocacoes();
    }, []);
  
    const carregarReservas = async () => {
      try {
        const response = await fetch("http://localhost:8080/reserva");
        const data = await response.json();
        setReservas(data);
      } catch (error) {
        console.error("Erro ao carregar reservas:", error);
      }
    };
  
    const carregarClientes = async () => {
      try {
        const response = await fetch("http://localhost:8080/cliente");
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    };
  
    const carregarLocacoes = async () => {
      try {
        const response = await fetch("http://localhost:8080/locacao");
        const data = await response.json();
        setLocacoes(data);
      } catch (error) {
        console.error("Erro ao carregar locações:", error);
      }
    };
  
    const excluirReserva = async (id) => {
      try {
        await fetch(`http://localhost:8080/reserva/${id}`, {
          method: "DELETE",
        });
        carregarReservas(); // Atualizar lista após exclusão
      } catch (error) {
        console.error("Erro ao excluir reserva:", error);
      }
    };

    const editarReserva = (reserva) => {
      setReservaEditando(reserva);
    };

    const cancelarEdicao = () => {
      setReservaEditando(null);
    };
  
    return (
      <div className="container">
        <h2>Reservas</h2>

        <ReservaForm
        reservaEditando={reservaEditando}
        onSalvar={() => {
          carregarReservas();
          setReservaEditando(null);
        }}
        cancelarEdicao={cancelarEdicao}
      />

        <h3>Lista de Reservas</h3>
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva.id}>
              <span>
              {clientes.find((c) => c.id === reserva.clienteId)?.nome} -{" "}
              {locacoes.find((l) => l.id === reserva.locacaoId)?.nome} (
              {reserva.dataInicio} a {reserva.dataFim}) | Situação: {reserva.situacao}
              </span>
              <div>
                <button onClick={() => editarReserva(reserva)}>Editar</button>
                <button onClick={() => excluirReserva(reserva.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ReservaList;
