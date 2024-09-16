import React from 'react';
import logo from './logo.svg';
import './App.css';
import ServerConfigForm from './components/ServerConfigForm';

const App: React.FC = () => {
  return (
    <div>
      <h1>Configuração dos Servidores</h1>
      <ServerConfigForm />
    </div>
  );
};

export default App;
