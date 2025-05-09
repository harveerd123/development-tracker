import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

const DevelopmentForm = ({setShowForm, editDev}) => {
    const [show, setShow] = useState(true);

    const [name, setName] = useState('');
    const [developmentType, setDevelopmentType] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [implementationDate, setImplementationDate] = useState('');
    const [version, setVersion] = useState('');

    const handleClose = () => {

        setName('');
        setDevelopmentType('');
        setDescription('');
        setStatus('');
        setDueDate('');
        setImplementationDate('');
        setVersion('');

        setShowForm(false);
        setShow(false);
    };

    useEffect(() => {
        if (editDev) {
            setName(editDev.name || '');
            setDevelopmentType(editDev.developmentType || '');
            setDescription(editDev.description || '');
            setStatus(editDev.status || '');
            setDueDate(editDev.dueDate ? new Date(editDev.dueDate).toLocaleDateString('en-CA') : '');
            setImplementationDate(editDev.implementationDate ? new Date(editDev.implementationDate).toLocaleDateString('en-CA') : '')
            setVersion(editDev.version || '');
        } else {
            setName('');
            setDevelopmentType('');
            setDescription('');
            setStatus('');
            setDueDate('');
            setImplementationDate('');
            setVersion('');
        }
    }, [editDev]);

    const handleSubmit = async () => {
        const data = {
            name,
            developmentType,
            description,
            status,
            dueDate: dueDate ? new Date(dueDate).toLocaleDateString('en-CA') : null,
            implementationDate: implementationDate ? new Date(implementationDate).toLocaleDateString('en-CA') : null,
            version
        };

        try {
            let response;
            if (editDev) {
                data.id = editDev.id
                response = await fetch(`/api/developments/${editDev.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            } else {
                response = await fetch('/api/developments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

            }
            if (response.ok) {
                console.log('Successfully saved:');
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Development saved successfully!',
                    confirmButtonText: 'OK',
                });
                handleClose();
            } else {
                console.error('Error saving:', response.statusText);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Error: ${response.statusText}`,
                });
            }

        } catch (error) {
            console.error('Error saving: ', error);
            Swal.fire({
                icon: 'error',
                title: 'An error occurred',
                text: `There was an issue while saving: ${error.message}`,
            });
        }
    };

  return (
      <>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Development</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
                      <Form.Group className="mb-3" controlId="Form.Name">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                              type="name"
                              placeholder="Name..."
                              value={name}
                              onChange={(e) => setName(e.target.value) }
                              autoFocus
                          />
                      </Form.Group>

                      <Form.Group
                          className="mb-3"
                          controlId="Form.DevelopmentType"
                      >
                          <Form.Label>Development Type</Form.Label>
                          <Form.Control
                              as="select"
                              value={developmentType}
                              onChange={(e) => setDevelopmentType(e.target.value)}>
                              <option value="">-- Select --</option>
                              <option value="New Features">New Features</option>
                              <option value="Optimisation">Optimisation</option>
                              <option value="Bugs">Bugs</option>
                          </Form.Control>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="Form.Description">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                              type="description"
                              placeholder="Description..."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              autoFocus
                          />
                      </Form.Group>

                      <Form.Group
                          className="mb-3"
                          controlId="Form.Status"
                      >
                          <Form.Label>Status</Form.Label>
                          <Form.Control
                              as="select"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}>
                            <option value="">-- Select --</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Testing">Testing</option>
                            <option value="Completed">Completed</option>
                          </Form.Control>
                      </Form.Group>
                      <Form.Group
                          className="mb-3"
                          controlId="Form.DueDate"
                      >
                          <Form.Label>Due Date</Form.Label>
                          <Form.Control
                              type="date"
                              value={dueDate}
                              onChange={(e) => setDueDate(e.target.value)}
                          />
                      </Form.Group>
                      <Form.Group
                          className="mb-3"
                          controlId="Form.ImplementationDate"
                      >
                          <Form.Label>Implementation Date</Form.Label>
                          <Form.Control
                              type="date"
                              value={implementationDate}
                              onChange={(e) => setImplementationDate(e.target.value)}
                          />
                      </Form.Group>
                      <Form.Group
                          className="mb-3"
                          controlId="Form.Version"
                      >
                          <Form.Label>Version</Form.Label>
                          <Form.Control
                              as="textarea"
                              rows={1}
                              value={version}
                              onChange={(e) => setVersion(e.target.value)}
                          />
                      </Form.Group>
                  </Form>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Close
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                      Save Changes
                  </Button>
              </Modal.Footer>
          </Modal>
      </>
  );
}

export default DevelopmentForm;