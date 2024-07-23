import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function CreateEmpresaModal({ show, handleClose, fetchEmpresas }) {
  const [formData, setFormData] = useState({
    nombre: '',
    fechaConstitucion: '',
    tipoEmpresa: '',
    comentarios: '',
    favorita: false,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = 'Este campo es obligatorio.';
    if (!formData.fechaConstitucion) newErrors.fechaConstitucion = 'Este campo es obligatorio.';
    if (!formData.tipoEmpresa) newErrors.tipoEmpresa = 'Este campo es obligatorio.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post('http://localhost:5000/empresas', formData);
        fetchEmpresas();
        resetForm(); // Reset cuando se hace el guardado 
        handleClose();
        alert('Empresa creada exitosamente');
      } catch (error) {
        console.error('Error creating empresa:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      fechaConstitucion: '',
      tipoEmpresa: '',
      comentarios: '',
      favorita: false,
    });
    setErrors({});
  };

  const handleCloseModal = () => {
    resetForm(); // Resetear cuando se cierra el modal 
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar empresa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre *</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              isInvalid={!!errors.nombre}
              maxLength={255}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formFechaConstitucion">
            <Form.Label>Fecha de constitución *</Form.Label>
            <Form.Control
              type="date"
              name="fechaConstitucion"
              value={formData.fechaConstitucion}
              onChange={handleInputChange}
              isInvalid={!!errors.fechaConstitucion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fechaConstitucion}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formTipoEmpresa">
            <Form.Label>Tipo de empresa *</Form.Label>
            <Form.Control
              as="select"
              name="tipoEmpresa"
              value={formData.tipoEmpresa}
              onChange={handleInputChange}
              isInvalid={!!errors.tipoEmpresa}
            >
              <option value="">Seleccionar...</option>
              <option value="Distribuidor">Distribuidor</option>
              <option value="Mayorista">Mayorista</option>
              <option value="Usuario final">Usuario final</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.tipoEmpresa}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formComentarios">
            <Form.Label>Comentarios</Form.Label>
            <Form.Control
              as="textarea"
              name="comentarios"
              value={formData.comentarios}
              onChange={handleInputChange}
              maxLength={1020}
            />
          </Form.Group>
          <Form.Group controlId="formFavorita">
            <Form.Check
              type="checkbox"
              name="favorita"
              label="Favorita"
              checked={formData.favorita}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateEmpresaModal;