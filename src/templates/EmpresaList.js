import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmpresaList() {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/empresas');
      const sortedEmpresas = response.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setEmpresas(sortedEmpresas);
    } catch (error) {
      console.error('Error fetching empresas:', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h2>Listado de Empresas</h2>
        <Button as={Link} to="/agregar-empresa" variant="primary">Agregar Empresa</Button>
      </div>
      {empresas.length === 0 ? (
        <p>Sin empresas creadas...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo de empresa</th>
              <th>Fecha de constitución</th>
              <th>Favorita</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr key={empresa.id}>
                <td>{empresa.nombre}</td>
                <td>{empresa.tipoEmpresa}</td>
                <td>{new Date(empresa.fechaConstitucion).toLocaleDateString()}</td>
                <td>{empresa.favorita ? 'Sí' : 'No'}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2">Editar</Button>
                  <Button variant="danger" size="sm">Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default EmpresaList;