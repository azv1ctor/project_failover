import React from 'react';
import { useFormik, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FiServer } from 'react-icons/fi';
import { AiOutlineDatabase } from 'react-icons/ai';
import { FaUserAlt, FaLock } from 'react-icons/fa';

interface ServerConfig {
  serverName: string;
  ipAddress: string;
  port: string;
  databaseName: string;
  username: string;
  password: string;
  isPrimary: boolean;
}

interface FormValues {
  servers: ServerConfig[];
}

const ServerConfigForm: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      servers: [
        {
          serverName: '',
          ipAddress: '',
          port: '',
          databaseName: '',
          username: '',
          password: '',
          isPrimary: true,
        },
        {
          serverName: '',
          ipAddress: '',
          port: '',
          databaseName: '',
          username: '',
          password: '',
          isPrimary: false,
        },
      ],
    },
    validationSchema: Yup.object({
      servers: Yup.array()
        .of(
          Yup.object().shape({
            serverName: Yup.string().required('Obrigatório'),
            ipAddress: Yup.string().required('Obrigatório'),
            port: Yup.number()
              .typeError('Deve ser um número')
              .required('Obrigatório')
              .min(1, 'Porta inválida'),
            databaseName: Yup.string().required('Obrigatório'),
            username: Yup.string().required('Obrigatório'),
            password: Yup.string().required('Obrigatório'),
            isPrimary: Yup.boolean(),
          })
        )
        .required(),
    }),
    onSubmit: (values) => {
      console.log('submit feito', values);
      axios
        .post('http://localhost:5149/api/ServerConfig', values.servers)
        .then(() => alert('Configurações salvas com sucesso!'))
        .catch((error) => {
          console.error('Erro ao salvar configurações:', error);
          alert('Erro ao salvar configurações');
        });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="max-w-3xl w-full p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Configuração dos Servidores
        </h1>
        <form onSubmit={formik.handleSubmit}>
          {formik.values.servers.map((server, index) => {
            const errorsArray = formik.errors.servers as Array<
              FormikErrors<ServerConfig>
            > | undefined;
            const touchedArray = formik.touched.servers as Array<
              FormikTouched<ServerConfig>
            > | undefined;

            const serverErrors = errorsArray ? errorsArray[index] || {} : {};
            const serverTouched = touchedArray ? touchedArray[index] || {} : {};

            return (
              <div
                key={index}
                className="mb-10 border p-6 rounded-lg shadow-md bg-gray-50"
              >
                <div className="flex items-center mb-6">
                  <FiServer className="text-3xl text-blue-600 mr-4" />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Servidor {index + 1} (
                    {server.isPrimary ? 'Primário' : 'Secundário'})
                  </h2>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Nome do Servidor
                  </label>
                  <div
                    className={`flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 ${
                      serverErrors.serverName && serverTouched.serverName
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <FiServer className="text-gray-400 mr-2" />
                    <input
                      className="w-full focus:outline-none"
                      name={`servers[${index}].serverName`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={server.serverName}
                      placeholder="Ex: Servidor Principal"
                    />
                  </div>
                  {serverErrors.serverName && serverTouched.serverName && (
                    <p className="text-red-500 text-sm mt-1">
                      {serverErrors.serverName}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Endereço IP
                  </label>
                  <div
                    className={`flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 ${
                      serverErrors.ipAddress && serverTouched.ipAddress
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <FiServer className="text-gray-400 mr-2" />
                    <input
                      className="w-full focus:outline-none"
                      name={`servers[${index}].ipAddress`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={server.ipAddress}
                      placeholder="Ex: 192.168.1.1"
                    />
                  </div>
                  {serverErrors.ipAddress && serverTouched.ipAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {serverErrors.ipAddress}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Porta
                  </label>
                  <div
                    className={`flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 ${
                      serverErrors.port && serverTouched.port
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <AiOutlineDatabase className="text-gray-400 mr-2" />
                    <input
                      className="w-full focus:outline-none"
                      type="number"
                      name={`servers[${index}].port`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={server.port}
                      placeholder="Ex: 3306"
                    />
                  </div>
                  {serverErrors.port && serverTouched.port && (
                    <p className="text-red-500 text-sm mt-1">
                      {serverErrors.port}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Nome do Banco de Dados
                  </label>
                  <div
                    className={`flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 ${
                      serverErrors.databaseName && serverTouched.databaseName
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <AiOutlineDatabase className="text-gray-400 mr-2" />
                    <input
                      className="w-full focus:outline-none"
                      name={`servers[${index}].databaseName`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={server.databaseName}
                      placeholder="Ex: meu_banco"
                    />
                  </div>
                  {serverErrors.databaseName && serverTouched.databaseName && (
                    <p className="text-red-500 text-sm mt-1">
                      {serverErrors.databaseName}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Usuário
                  </label>
                  <div
                    className={`flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 ${
                      serverErrors.username && serverTouched.username
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <FaUserAlt className="text-gray-400 mr-2" />
                    <input
                      className="w-full focus:outline-none"
                      name={`servers[${index}].username`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={server.username}
                      placeholder="Ex: admin"
                    />
                  </div>
                  {serverErrors.username && serverTouched.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {serverErrors.username}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Senha
                  </label>
                  <div
                    className={`flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 ${
                      serverErrors.password && serverTouched.password
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <FaLock className="text-gray-400 mr-2" />
                    <input
                      className="w-full focus:outline-none"
                      type="password"
                      name={`servers[${index}].password`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={server.password}
                      placeholder="Digite a senha"
                    />
                  </div>
                  {serverErrors.password && serverTouched.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {serverErrors.password}
                    </p>
                  )}
                </div>

                <input
                  type="hidden"
                  name={`servers[${index}].isPrimary`}
                  value={String(server.isPrimary)}
                />
              </div>
            );
          })}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Salvar Configurações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServerConfigForm;
