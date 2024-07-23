import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmpresaForm from './templates/EmpresaForm';
import EmpresaList from './templates/EmpresaList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div className="App">
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<EmpresaList />} />
            <Route path="/agregar-empresa" element={<EmpresaForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;