import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function DeleteEmpresaModal({ show, handleClose, empresa, fetchEmpresas }) {
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/empresas/${empresa.id}`);
      fetchEmpresas();
      handleClose();
      alert('Empresa eliminada exitosamente');
    } catch (error) {
      console.error('Error deleting empresa:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar empresa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que deseas eliminar esta empresa?</p>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteConfirm}>
          Aceptar
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteEmpresaModal;