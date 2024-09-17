import React, { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { AiFillDatabase } from 'react-icons/ai';
import { FiServer } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ServerConfig {
  serverName: string;
  ipAddress: string;
  port: string;
  isPrimary: boolean;
}

const ServerStatusDashboard: React.FC = () => {
  const [currentServer, setCurrentServer] = useState<ServerConfig | null>(null);
  const previousServerRef = useRef<ServerConfig | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5149/serverStatusHub')
      .withAutomaticReconnect()
      .build();

    connection.on('ServerStatusChanged', (server: ServerConfig) => {
      if (
        previousServerRef.current &&
        previousServerRef.current.serverName !== server.serverName
      ) {
        const message = server.isPrimary
          ? 'Alternado para o Servidor Primário'
          : 'Alternado para o Servidor Secundário';

        toast.info(message);
      }

      previousServerRef.current = server;
      setCurrentServer(server);
    });

    connection
      .start()
      .then(() => {
        console.log('Conectado ao serverStatusHub');

        connection
          .invoke('GetCurrentServerStatus')
          .catch((err) =>
            console.error('Erro ao obter o status do servidor:', err)
          );
      })
      .catch((err) => {
        console.error('Erro ao conectar ao serverStatusHub', err);
      });

    connection.onclose((error) => {
      console.error('Conexão encerrada:', error);
    });

    return () => {
      connection
        .stop()
        .catch((err) => console.error('Erro ao parar a conexão:', err));
    };
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-lg w-full p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Dashboard de Status dos Servidores
          </h1>
          {currentServer ? (
            <div>
              <div className="flex items-center justify-center mb-6">
                <FiServer className="text-5xl text-blue-600 mr-4" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentServer.serverName}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium mr-2">
                    Endereço IP:
                  </span>
                  <span className="text-gray-800">
                    {currentServer.ipAddress}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium mr-2">
                    Porta:
                  </span>
                  <span className="text-gray-800">{currentServer.port}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium mr-2">
                    Papel:
                  </span>
                  <span
                    className={`text-lg font-semibold ${
                      currentServer.isPrimary
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {currentServer.isPrimary
                      ? 'Servidor Primário'
                      : 'Servidor Secundário'}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-4 ${
                      currentServer.isPrimary
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    }`}
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
              <p className="text-center text-gray-600 mt-4">
                {currentServer.isPrimary
                  ? 'Operando no Servidor Primário'
                  : 'Operando no Servidor Secundário'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <svg
                className="animate-spin h-10 w-10 text-white mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25 text-gray-400"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75 text-blue-600"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <p className="text-center text-white">
                Carregando status do servidor...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ServerStatusDashboard;
