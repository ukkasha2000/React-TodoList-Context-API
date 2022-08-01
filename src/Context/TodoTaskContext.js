import React, { createContext, useState } from 'react'

const TodoTasks = createContext([]);

export const TodoTaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [isShowEditBtn, setIsShowEditBtn] = useState(true);
    const [taskInput, setTaskInput] = useState("");
    const [updateID, setUpdateID] = useState();

    return (
        <TodoTasks.Provider value={{ tasks, setTasks, isShowEditBtn, setIsShowEditBtn, taskInput, setTaskInput, updateID, setUpdateID }}>
            {children}
        </TodoTasks.Provider>
    )
}

export default TodoTasks;

