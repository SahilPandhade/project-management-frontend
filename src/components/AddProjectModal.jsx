import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/ClientQueries';
import { ADD_PROJECT } from '../mutations/projectMutations';
const AddProjectModal = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('new');

    const [addProject] = useMutation(ADD_PROJECT,{variables:{name,description,status,clientId},
    update(cache,{data:{addProject}}){
        const {projects} = cache.readQuery({query: GET_PROJECTS})
        cache.writeQuery({
            query:GET_PROJECTS,
            data:{projects:[...projects,addProject]}
        }) 
    }
    })
    const { loading, error, data } = useQuery(GET_CLIENTS)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === '' || description === '' || status === '') {
            return alert('Please fill all fields')
        }
        addProject(name,description,clientId,status)
        setName('');
        setDescription('');
        setStatus('new')
        setClientId('')
    }
    if (loading) return null;
    if (error) return 'Something went Wrong...'
    return (
        <>
            {!loading && !error && (
                <>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                        <div className="d-flex align-items-center">
                            <FaList className='icon' />
                            <div>Add Project</div>
                        </div>
                    </button>
                    <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModal" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title fs-5" id="addProjectModal">New Project</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className='mb-3'>
                                            <label className='form-label'>Name</label>
                                            <input type="text" className='form-control' id='name'
                                                value={name} onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label className='form-label'>Description</label>
                                            <textarea className='form-control' id='description'
                                                value={description} onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label className='form-label'>Status</label>
                                            <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                <option className='' value={'new'}>New</option>
                                                <option className='' value={'progress'}>In Progress</option>
                                                <option className='' value={'completed'}>Completed</option>
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <label className='form-label'>Client</label>
                                            <select id="clientId" className="form-select" value={clientId} onChange={(e)=>{setClientId(e.target.value)}}>
                                                <option value="">Select</option>
                                                {
                                                    data.clients.map((client)=>(
                                                        <option key={client.id} value={client.id}>{client.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <button type='submit' data-bs-dismiss="modal" className='btn btn-secondary'>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default AddProjectModal