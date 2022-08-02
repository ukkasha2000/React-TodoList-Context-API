import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import TodoTasks from "../../Context/TodoTaskContext"

const Task = ({ value }) => {
    const { tasks, setTasks, setIsShowEditBtn, setTaskInput, setUpdateID } = useContext(TodoTasks);

    const deleteTaskFunc = (id) => {

        async function deleteData() {
            await axios.delete(`http://localhost:3232/todos/${id}`)
                .then(function (responce) {
                    const removeItem = tasks.filter((currentElement) => {
                        return currentElement.id != id;
                    });
                    for (let k = 0; k < removeItem.length; k++) {
                        removeItem[k].id = k + 1;
                    }
                    setTasks(removeItem);
                })
                .catch((error) => alert(error));
        }
        deleteData();
    }

    //Edit TodoList
    const editTaskFunc = (dataa) => {
        setIsShowEditBtn(false);
        setTaskInput(dataa.todo);
        setUpdateID(dataa.id);
    }
    return (
        <>
            <h2 className='todoListShow'>Task {value.id} : {value.todo}
                <div className='todoButtons'>
                    <button className='edit-task-button' onClick={() => editTaskFunc(value)}><i className="fa fa-pencil"></i></button>
                    <button className='del-task-button' onClick={() => deleteTaskFunc(value.id)}><i className="fa fa-trash"></i></button>
                </div>
            </h2>
        </>
    )
}

export default Task;