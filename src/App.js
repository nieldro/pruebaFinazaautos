import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Form, Input, Label } from 'reactstrap';

const initialData = [
 { id: 1, Nombre: "Daniel", Apellido: "Paez", Genero: "Hombre", Correo: "daniel@example.com", FechaNacimiento: "1990-01-01", Telefono: "123456789", Cargo: "Desarrollador", Foto: "ruta/a/la/foto/de/daniel.jpg" },
 { id: 2, Nombre: "Andrea", Apellido: "Ruiz", Genero: "Mujer", Correo: "andrea@example.com", FechaNacimiento: "1992-02-02", Telefono: "987654321", Cargo: "Contadora", Foto: "ruta/a/la/foto/de/andrea.jpg" },
 { id: 3, Nombre: "Josefina", Apellido: "Torres", Genero: "Mujer", Correo: "josefina@example.com", FechaNacimiento: "1994-03-03", Telefono: "456789123", Cargo: "Abogada", Foto: "ruta/a/la/foto/de/josefina.jpg" }
];

class App extends React.Component {
 state = {
    data: initialData,
    modal: false,
    modalData: null,
    modalMode: 'insert', // 'insert' or 'edit'
    formData: { Nombre: '', Apellido: '', Genero: '', Correo: '', FechaNacimiento: '', Telefono: '', Cargo: '', Foto: '' }, // Estado para los datos del formulario
    viewModal: false,
    viewData: null
 }

 toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      formData: { Nombre: '', Apellido: '', Genero: '', Correo: '', FechaNacimiento: '', Telefono: '', Cargo: '', Foto: '' } // Resetear los datos del formulario al cerrar el modal
    }));
 }

 toggleViewModal = () => {
    this.setState(prevState => ({
      viewModal: !prevState.viewModal,
      viewData: null
    }));
 }

 handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      formData: { ...prevState.formData, [name]: value }
    }));
 }

 handleInsert = () => {
    this.setState({ modalMode: 'insert', modalData: null });
    this.toggleModal();
 }

 handleEdit = (id) => {
    const dataToEdit = this.state.data.find(item => item.id === id);
    this.setState({ modalMode: 'edit', modalData: dataToEdit, formData: { ...dataToEdit } });
    this.toggleModal();
 }

 handleView = (id) => {
    const dataToView = this.state.data.find(item => item.id === id);
    this.setState({ viewModal: true, viewData: dataToView });
 }

 handleDelete = (id) => {
    const newData = this.state.data.filter(item => item.id !== id);
    this.setState({ data: newData });
 }

 handleSave = () => {
    const { modalMode, formData, data } = this.state;
    if (modalMode === 'insert') {
      // Insertar nuevo registro
      const newData = [...data, { ...formData, id: data.length + 1 }];
      this.setState({ data: newData });
    } else if (modalMode === 'edit') {
      // Editar registro existente
      const newData = data.map(item => item.id === formData.id ? { ...formData } : item);
      this.setState({ data: newData });
    }
    this.toggleModal();
 }

 render() {
    return (
      <Container>
        <div className="header">
          <h1>FinanzaAutos</h1>
          <img src="ruta/a/la/foto/de/perfil.jpg" alt="Foto de Perfil" className="profile-pic" />
          <p>Usuario</p>
        </div>
        <Button color="success" onClick={this.handleInsert}>Insertar nuevo Usuario</Button>
        <br />
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Genero</th>
              <th>Correo</th>
              <th>Fecha de Nacimiento</th>
              <th>Telefono</th>
              <th>Cargo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(elemento => (
              <tr key={elemento.id}>
                <td>{elemento.id}</td>
                <td>{elemento.Nombre}</td>
                <td>{elemento.Apellido}</td>
                <td>{elemento.Genero}</td>
                <td>{elemento.Correo}</td>
                <td>{elemento.FechaNacimiento}</td>
                <td>{elemento.Telefono}</td>
                <td>{elemento.Cargo}</td>
                <td>
                 <Button color="primary" onClick={() => this.handleEdit(elemento.id)}>Editar</Button>{" "}
                 <Button color="info" onClick={() => this.handleView(elemento.id)}>Ver</Button>{" "}
                 <Button color="danger" onClick={() => this.handleDelete(elemento.id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <div><h3>{this.state.modalMode === 'insert' ? 'Insertar Usuario' : 'Editar Usuario'}</h3></div>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <label>Nombre</label>
                <Input type="text" name="Nombre" value={this.state.formData.Nombre} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <label>Apellido</label>
                <Input type="text" name="Apellido" value={this.state.formData.Apellido} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="Genero">Genero</Label>
                <Input type="select" name="Genero" id="Genero" value={this.state.formData.Genero} onChange={this.handleInputChange}>
                 <option value="">Seleccione...</option>
                 <option value="Hombre">Hombre</option>
                 <option value="Mujer">Mujer</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <label>Correo</label>
                <Input type="email" name="Correo" value={this.state.formData.Correo} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <label>Fecha de Nacimiento</label>
                <Input type="date" name="FechaNacimiento" value={this.state.formData.FechaNacimiento} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <label>Telefono</label>
                <Input type="tel" name="Telefono" value={this.state.formData.Telefono} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <label>Cargo</label>
                <Input type="text" name="Cargo" value={this.state.formData.Cargo} onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <label>Foto de Perfil</label>
                <Input type="file" name="Foto" onChange={this.handleInputChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSave}>Guardar</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.viewModal} toggle={this.toggleViewModal}>
 <ModalHeader toggle={this.toggleViewModal}>Detalles del Usuario</ModalHeader>
 <ModalBody>
    {this.state.viewData && (
      <div>
        <p><strong>Nombre:</strong> {this.state.viewData.Nombre}</p>
        <p><strong>Apellido:</strong> {this.state.viewData.Apellido}</p>
        <p><strong>Genero:</strong> {this.state.viewData.Genero}</p>
        <p><strong>Correo:</strong> {this.state.viewData.Correo}</p>
        <p><strong>Fecha de Nacimiento:</strong> {this.state.viewData.FechaNacimiento}</p>
        <p><strong>Telefono:</strong> {this.state.viewData.Telefono}</p>
        <p><strong>Cargo:</strong> {this.state.viewData.Cargo}</p>
        <p><strong>Foto de Perfil:</strong></p>
        <img src={this.state.viewData.Foto} alt="Foto de Perfil" style={{width: '100px', height: '100px'}} />
      </div>
    )}
 </ModalBody>
 <ModalFooter>
    <Button color="secondary" onClick={this.toggleViewModal}>Cerrar</Button>
 </ModalFooter>
</Modal>

</Container>
);
}
}

export default App;

