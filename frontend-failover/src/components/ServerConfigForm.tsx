import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ServerConfigForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      serverName: '',
      ipAddress: '',
      port: 0,
      databaseName: '',
      username: '',
      password: '',
      isPrimary: false,
    },
    validationSchema: Yup.object({
      serverName: Yup.string().required('Obrigatório'),
      ipAddress: Yup.string().required('Obrigatório'),
      port: Yup.number().required('Obrigatório').min(1),
      databaseName: Yup.string().required('Obrigatório'),
      username: Yup.string().required('Obrigatório'),
      password: Yup.string().required('Obrigatório'),
    }),
    onSubmit: (values) => {
        console.log('submit feito', values);  
        axios.post('http://localhost:5149/api/ServerConfig', values)
          .then(() => alert('Configuração salva com sucesso!'))
          .catch((error) => {
            console.error('Erro ao salvar configuração:', error);
            alert('Erro ao salvar configuração');
          });
      },      
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Nome do Servidor</label>
        <input
          name="serverName"
          onChange={formik.handleChange}
          value={formik.values.serverName}
        />
        {formik.errors.serverName ? <div>{formik.errors.serverName}</div> : null}
      </div>
      <div>
        <label>Endereço IP</label>
        <input
          name="ipAddress"
          onChange={formik.handleChange}
          value={formik.values.ipAddress}
        />
        {formik.errors.ipAddress ? <div>{formik.errors.ipAddress}</div> : null}
        </div>
        <div>
            <label>Porta</label>
            <input
            name="port"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.port}
            />
            {formik.errors.port ? <div>{formik.errors.port}</div> : null}
        </div>
        <div>
            <label>Nome do Banco de Dados</label>
            <input
            name="databaseName"
            onChange={formik.handleChange}
            value={formik.values.databaseName}
            />
            {formik.errors.databaseName ? <div>{formik.errors.databaseName}</div> : null}
        </div>
        <div>
            <label>Usuário</label>
            <input
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            />
            {formik.errors.username ? <div>{formik.errors.username}</div> : null}
        </div>
        <div>
            <label>Senha</label>
            <input
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            />
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>
        <div>
        <label>
          <input
            name="isPrimary"
            type="checkbox"
            onChange={formik.handleChange}
            checked={formik.values.isPrimary}
          />
          Servidor Primário
        </label>
      </div>
      <button type="submit">Salvar Configuração</button>
    </form>
  );
};

export default ServerConfigForm;
