import React, { useState } from 'react'
import Costants from '../utilities/Constants'

export default function TaskCreateForm(props) {

    const initialFormData = Object.freeze({
        name: "task",
        priority: 5,
        description: "description"
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const taskToCreate = {
            id: 0,
            name: formData.name,
            priority: formData.priority,
            description: formData.description
        };

        console.log(taskToCreate);

        const url = Costants.API_URL_CREATE_POST;

        //fetch
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            })
        props.onTaskCreated(taskToCreate);
    };

    return (
        <form className='w-100 px-5'>
            <h1 className='mt-5'>Create Task</h1>

            <div className='mt-5'>
                <label className='h3 form-label'> Task Name</label>
                <input value={formData.name} name="name" type="text" className='form-control' onChange={handleChange} />
            </div>
            
            <div className='mt-5'>
                <label className='h3 form-label'> Task Priority</label>
                <input value={formData.priority} name="priority" type="number" className='form-control' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='h3 form-label'> Task Description</label>
                <input value={formData.description} name="description" type="text" className='form-control' onChange={handleChange} />
            </div>

            <br/>

            <button onClick={handleSubmit} className="btn btn-dark">Submit</button>
            <button onClick={() => props.onTaskCreated(null)} className="btn btn-dark">Cancel</button>
        </form>
    )
}
