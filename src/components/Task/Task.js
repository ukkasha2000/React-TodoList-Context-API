import React, { useContext, useEffect, useState } from 'react';
import TodoTasks from "../../Context/TodoTaskContext"

const Task = ({ value }) => {
    const { tasks, setTasks, isShowEditBtn, setIsShowEditBtn, taskInput, setTaskInput, updateID, setUpdateID } = useContext(TodoTasks);

    //   return 
    // const todoTasks = useContext(TodoTasks);
    // const [mapperi,setMapper] = useState(todoTasks);
    // useEffect(()=>{
    //     setMapper(todoTasks);
    // },[todoTasks]);
    // const flag = useContext(Flag);
    //Delete Todolist
    const deleteTaskFunc = (id) => {
        const removeItem = tasks.filter((currentElement) => {
            return currentElement.id != id;
        });
        for (let k = 0; k < removeItem.length; k++) {
            removeItem[k].id = k + 1;
        }
        setTasks(removeItem);
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

export default Task