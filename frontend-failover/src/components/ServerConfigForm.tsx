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
      axios.post('http://localhost:5000/api/ServerConfig', values)
        .then(() => alert('Configuração salva com sucesso!'))
        .catch((error) => console.error('Erro ao salvar configuração:', error));
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
      <button type="submit">Salvar Configuração</button>
    </form>
  );
};

export default ServerConfigForm;
