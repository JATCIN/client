import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import EditEmpresaModal from './EmpresaEdit';
import DeleteEmpresaModal from './EmpresaDelete';
import CreateEmpresaModal from './EmpresaForm';

function EmpresaList() {
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/empresas');
      setEmpresas(response.data);
    } catch (error) {
      console.error('Error fetching empresas:', error);
    }
  };

  const handleEditClick = (empresa) => {
    setSelectedEmpresa(empresa);
    setShowEditModal(true);
  };

  const handleDeleteClick = (empresa) => {
    setSelectedEmpresa(empresa);
    setShowDeleteModal(true);
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleCreateClick}>
          Agregar Empresa
        </Button>
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
                <td>{empresa.fechaConstitucion}</td>
                <td>{empresa.favorita ? 'Sí' : 'No'}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEditClick(empresa)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteClick(empresa)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <EditEmpresaModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        empresa={selectedEmpresa}
        fetchEmpresas={fetchEmpresas}
      />

      <DeleteEmpresaModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        empresa={selectedEmpresa}
        fetchEmpresas={fetchEmpresas}
      />

      <CreateEmpresaModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        fetchEmpresas={fetchEmpresas}
      />
    </div>
  );
}

export default EmpresaList;