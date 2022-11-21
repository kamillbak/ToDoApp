import React, { useState } from 'react'
import Costants from '../utilities/Constants'

export default function TaskUpdateForm(props) {

    const initialFormData = Object.freeze({
        name: props.task.name,
        priority: props.task.priority,
        description: props.task.description
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

        const taskToUpdate = {
            id: props.task.id,
            name: formData.name,
            priority: formData.priority,
            description: formData.description
        };

        console.log(taskToUpdate);

        const url = Costants.API_URL_UPDATE_POST;

        //fetch
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskToUpdate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            })
        props.onTaskUpdated(taskToUpdate);
    };

    return (
        <form className='w-100 px-5'>
            <h1 className='mt-5'>Updating task titled: {props.task.name}</h1>

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
            <button onClick={() => props.onTaskUpdated(null)} className="btn btn-dark">Cancel</button>
        </form>
    )
}
