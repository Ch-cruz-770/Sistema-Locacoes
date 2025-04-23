import React, { useState } from 'react';
import './Components/styles.css';

import ClienteForm from './Components/Cliente/ClienteForm';
import ClienteList from './Components/Cliente/ClienteList';

import LocacaoForm from './Components/Locacao/LocacaoForm';
import LocacaoList from './Components/Locacao/LocacaoList';

import ReservaForm from './Components/Reserva/ReservaForm';
import ReservaList from './Components/Reserva/ReservaList';

function App() {
  const [abaAtiva, setAbaAtiva] = useState('clientes');

  const [clienteEditando, setClienteEditando] = useState(null);
  const [atualizarClientes, setAtualizarClientes] = useState(false);

  const[locacaoEditando, setLocacaoEditando] = useState(null);
  const[atualizarLocacoes, setAtualizarLocacoes] = useState(false);

  const[reservaEditando, setReservaEditando] = useState(null);
  const[atualizarReservas, setAtualizarReservas] = useState(false);


  return (
    <div className="container"> {/* Aplicando a classe de container */}
      <header>
        <h2>Locações</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setAbaAtiva('clientes')}>Clientes</button>
          <button onClick={() => setAbaAtiva('locacoes')}>Locações</button>
          <button onClick={() => setAbaAtiva('reservas')}>Reservas</button>
        </div>
      </header>

      <main>
        {abaAtiva === 'clientes' && (
          <>
             <ClienteForm 
             clienteEditando={clienteEditando} 
             onSalvar={() => {
              setAtualizarClientes(!atualizarClientes);
              setClienteEditando(null);
             }} 
             cancelarEdicao={() => setClienteEditando(null)}
             />
            <ClienteList
              onEditar={setClienteEditando}
              atualizar={atualizarClientes}
              />
          </>
        )}
        {abaAtiva === 'locacoes' && (
          <>
            <LocacaoForm 
            locacaoEditando={locacaoEditando}
            onSalvar={() => {
              setAtualizarLocacoes(!atualizarLocacoes);
              setLocacaoEditando(null);
            }}
            cancelarEdicao={() => setLocacaoEditando(null)} 
            />
            <LocacaoList 
             onEditar={setLocacaoEditando}
             atualizar={atualizarLocacoes}
             />
          </>
        )}
        {abaAtiva === 'reservas' && (
          <>
            <ReservaForm 
             reservaEditando={reservaEditando}
             onSalvar={() => {setAtualizarReservas(!atualizarReservas);
              setReservaEditando(null);
             }}
             cancelarEdicao={() => setReservaEditando(null)}
             />
            <ReservaList 
            onEditar={setReservaEditando}
            atualizar={atualizarReservas}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
