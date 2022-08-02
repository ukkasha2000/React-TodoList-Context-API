import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const TodoTasks = createContext([]);

export const TodoTaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [isShowEditBtn, setIsShowEditBtn] = useState(true);
    const [taskInput, setTaskInput] = useState("");
    const [updateID, setUpdateID] = useState();

    useEffect(() => {
        async function getData() {
          await axios.get('http://localhost:3232/todos')
            .then(function (resp) {
              setTasks(resp.data);
    
            }).catch(function (error) {
              alert(error);
            })
        }
        getData();
      }, []);
    

    return (
        <TodoTasks.Provider value={{ tasks, setTasks, isShowEditBtn, setIsShowEditBtn, taskInput, setTaskInput, updateID, setUpdateID }}>
            {children}
        </TodoTasks.Provider>
    )
}

export default TodoTasks;

