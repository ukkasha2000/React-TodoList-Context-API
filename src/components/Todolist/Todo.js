import React, { useContext, useEffect, useState } from 'react';
import Task from '../Task/Task';
import './Todo.css';
import TodoTasks from "../../Context/TodoTaskContext";
import axios from 'axios';


const Todo = () => {
  const { tasks, setTasks, isShowEditBtn, setIsShowEditBtn, taskInput, setTaskInput, updateID } = useContext(TodoTasks);
  let check = false, check2 = false;
  const [listToShow, setListToShow] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    check = false;
    tasks.map((currentElement) => {
      if (currentElement.todo.toLowerCase() === taskInput.toLowerCase()) {
        check = true;
      }
    })
    if (check === true) {
      alert("Task Already Exists")
    }
    else if (check === false) {
      
      async function postData(){
        await axios.post('http://localhost:3232/todos', { "todo": taskInput })
        .then(function (responce) {
          setTasks([...tasks, { id: tasks.length + 1, todo: taskInput }]);
        })
        .catch((error)=>alert(error));
      }
      postData();
      setTaskInput("");

    }
  }

  const updateTask = (e) => {
    e.preventDefault();
    tasks.map((currentElement) => {
      if (currentElement.id === updateID) {
        check2 = false;
        tasks.map((currEle) => {
          if (currEle.todo.toLowerCase() === taskInput.toLowerCase()) {
            check2 = true;
          }
        })
        if (check2 === true) {
          alert("Task Already Exists");
        }
        else {
          async function updateData() {
            await axios.put(`http://localhost:3232/todos/${currentElement.id}`, { "todo": taskInput })
              .then(function (responce) {
                currentElement.todo = taskInput;
                // setTasks( [...tasks, {...tasks,"currentElement.todo": taskInput}] )
                setTasks([...tasks]);
                // setTasks((prevState) => [...prevState, {...prevState,"todo" : taskInput}]);
                // setTasks((aa) => {return aa});
                // console.log(tasks);
              })
              .catch((error) => alert(error));
          }
          updateData();
          // setTasks(tasks);
        }
      }
    })
    setIsShowEditBtn(true);
    setTaskInput("");
  }

  // Filtering Todos
  useEffect(() => {
    if (taskInput === "") {
      setListToShow(tasks);
    }
    else {
      setListToShow(() => {
        return tasks.filter((current) => current.todo.toLowerCase().includes(taskInput.toLowerCase()));
      })
    }
  }, [taskInput, tasks]);

  return (
    <>
      <div className='mainDiv'>
        <div className='todo-form-div'>
          <h2 className='addNewTaskHeading'>Add New Task</h2>
          <form onSubmit={isShowEditBtn ? handleSubmit : updateTask} className='todo-form'>
            <input type="text" id="todo-form-inputField" className='todo-form-input' placeholder='Task Name'
              required value={taskInput} onChange={(e) => {
                setTaskInput(e.target.value);
              }} />
            {isShowEditBtn ?
              <button type='submit' id="todo-form-submit">
                <i className="fa fa-check"></i>
              </button>
              :
              <button type='submit' id='updateListButton'>Update</button>
            }
          </form>
        </div>
        <div className='todoListDiv'>
          {
            listToShow.map((currentElement, index) => <Task value={currentElement} key={index} />)
          }
        </div>
      </div>


    </>
  )
}

export default Todo;