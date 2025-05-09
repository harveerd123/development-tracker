import React, { useState, useEffect } from 'react';
import DevelopmentForm from '../components/DevelopmentForm';
import Swal from 'sweetalert2';

const Developments = () => {
    const [developments, setDevelopments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editDev, setEditDev] = useState(null);



    useEffect(() => {
        populateDevelopmentData();
    }, [showForm]);

    async function populateDevelopmentData() {
        const response = await fetch('/api/developments');
        const data = await response.json();
        setDevelopments(data);
    }

    const deleteDevelopment = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to undo this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/developments/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    Swal.fire('Deleted!', 'The development has been deleted.', 'success');
                    populateDevelopmentData() 
                } else {
                    Swal.fire('Error', 'There was an issue deleting the development.', 'error');
                }
            } catch (error) {
                console.error('Error deleting development:', error);
                Swal.fire('Error', 'Failed to delete the development.', 'error');
            }
        }
    };

    return (
        <div className='development-body'>
            <h4>Developments</h4>
            <button className="btn btn-success" onClick={() => { setShowForm(true); setEditDev(null); }}>Add Development</button>
            {showForm && <DevelopmentForm setShowForm={setShowForm} editDev={editDev} />}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Development Type</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Implementation Date</th>
                        <th>Version</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {developments.length > 0 ? (
                        developments.map((dev, index) => (
                            <tr key={index}>
                                <td>{dev.id}</td>
                                <td>{dev.name}</td>
                                <td>{dev.description}</td>
                                <td>{dev.developmentType}</td>
                                <td>{dev.status}</td>
                                <td>{dev.dueDate}</td>
                                <td>{dev.implementationDate}</td>
                                <td>{dev.version}</td>
                                <td>
                                    <button className="btn btn-primary me-2" onClick={() => { setShowForm(true); setEditDev(dev); }}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteDevelopment(dev.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>No developments in progress or loading...</td>
                        </tr>
                    )}
                </tbody>



            </table>

        </div>
    );
};

export default Developments;

