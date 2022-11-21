import React from "react";
import { useState } from "react";
import TaskCreateForm from "./Components/TaskCreateForm";
import TaskUpdateForm from "./Components/TaskUpdateForm";

import Costants from "./utilities/Constants";

function App() {

  const [tasks, setTasks] = useState([]);
  const [showingCreatingTaskForm, setshowingCreatingTaskForm] = useState(false);
  const [taskCurrentlyBeingUpdated, settaskCurrentlyBeingUpdated] = useState(null);
  const [tasksDone, settasksDone] = useState([]);

  function getTasks() {
    const url = "https://localhost:7076/api/Task";

    fetch(url, {
      method: 'GET'
    })
      .then(r => r.json())
      .then(tasksFromServer => {
        setTasks(tasksFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
  }

  function deleteTask(id) {
    const url = `${Costants.API_URL_DELETE_POST_BY_ID}/${id}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onTaskDeleted(id)
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
  }

  function taskDone(id) {
    console.log(`task with id ${id} is done`);

    const tasksDaneCopy = tasksDone; //copy

    if(!tasksDaneCopy.includes(id)) // if task is not done yet
    {
      tasksDaneCopy.push(id); //add new task
    }
    
    settasksDone(tasksDaneCopy); // set copy as tasksDane

    getTasks(); // refresh tasks 
  }



  return (
    <div className="container">
      {(showingCreatingTaskForm === false && taskCurrentlyBeingUpdated === null) && (
        <div>
          <div >
            <h1 className="text-center"> Your To Do List </h1>
            <br />
            <p className="text-center text-success fw-bold">Let's work a little bit, make all tasks green </p>
          </div>
          <br />
          <div className="text-center">
            <button onClick={getTasks} className="btn btn-dark me-1 ">show tasks</button>
            <button onClick={() => setshowingCreatingTaskForm(true)} className="btn btn-dark ">add task</button>
          </div>
        </div>
      )}

      {(tasks.length > 0 && showingCreatingTaskForm === false && taskCurrentlyBeingUpdated === null) && renderTasksTable()}

      {showingCreatingTaskForm && <TaskCreateForm onTaskCreated={onTaskCreated} />}

      {taskCurrentlyBeingUpdated !== null && <TaskUpdateForm task={taskCurrentlyBeingUpdated} onTaskUpdated={onTaskUpdated} />}
    </div>
  );


  function renderTasksTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-dark table-hover ">
          <thead>
            <tr>
              <th scope="col">TaskID (PK)</th>
              <th scope="col">Name</th>
              <th scope="col">Priority</th>
              <th scope="col">Description</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(t => (
              <tr key={t.id}>
                <td className={tasksDone.includes(t.id) ? "text-success fw-bold" : null }>{t.id}</td>
                <td className={tasksDone.includes(t.id) ? "text-success fw-bold" : null }>{t.name}</td>
                <td className={tasksDone.includes(t.id) ? "text-success fw-bold" : null }>{t.priority}</td>
                <td className={tasksDone.includes(t.id) ? "text-success fw-bold" : null }>{t.description}</td>
                <td>
                  <button onClick={() => settaskCurrentlyBeingUpdated(t)} className="btn btn-primary me-1 ">Update</button>
                  <button onClick={() => deleteTask(t.id)} className="btn btn-danger me-1">Delete</button>
                  <button onClick={() => taskDone(t.id)} className="btn btn-success">Done</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function onTaskCreated(createdTask) {

    setshowingCreatingTaskForm(false);

    if (createdTask === null) {
      return;
    }
    alert('Post successfully created');
    getTasks();
  }

  function onTaskUpdated(updatedTask) {
    settaskCurrentlyBeingUpdated(null);

    if (updatedTask === null) {
      return;
    }

    let tasksCopy = [...tasks];

    const index = tasksCopy.findIndex((tasksCopyPost) => {
      if (tasksCopyPost.id === updatedTask.id) {
        return true;
      }
    });

    if (index !== -1) {
      tasksCopy[index] = updatedTask;
    }

    setTasks(tasksCopy);

    alert(`Post with name "${updatedTask.name}" updated successfully`);
  }

  function onTaskDeleted(id) {
    alert(`Post deleted`);
    getTasks();
  }

}

export default App;



