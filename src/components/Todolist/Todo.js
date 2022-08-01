import React, { createContext, useContext, useState } from 'react';
import Task from '../Task/Task';
import './Todo.css';
import TodoTasks from "../../Context/TodoTaskContext"


const Todo = () => {
  const { tasks, setTasks, isShowEditBtn, setIsShowEditBtn , taskInput, setTaskInput, updateID, setUpdateID} = useContext(TodoTasks);
  let check = false, check2= false;


  console.log(tasks);

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
      setTasks([...tasks, { id: tasks.length + 1, todo: taskInput }]);
      setTaskInput("");
    }
  }

  const updateTask = (e) => {
    e.preventDefault();
    tasks.map((currentElement)=>{
       if(currentElement.id === updateID){
        check2 = false;
        tasks.map((currEle)=>{
          if(currEle.todo.toLowerCase() === taskInput.toLowerCase()){
            check2 =true;
          }
        })
        if(check2===true){
          alert("Task Already Exists");
        }
        else currentElement.todo = taskInput;
       }
    })
    setIsShowEditBtn(true);
    setTaskInput("");
  }

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
            tasks.map((currentElement) => <Task value={currentElement} key={currentElement.id} />)
          }
        </div>
      </div>


    </>
  )
}

export default Todo;
// export { TodoTasks, Flag };

// const Todo = () => {
//   const [todoArray, settodoArray] = useState([]);
//   const [filterArray, setFilterArray] = useState([]);
//   const [filterCheck, setFilterCheck] = useState(true);
//   const [isShowEditBtn, setIsShowEditBtn] = useState(true);
//   const [chars,setChars] = useState("");
//   const [ind, setInd] = useState();


//   let obj = {};
//   let flag;

//   //Storing the input of todo
//   const storeInput = () => {
//     flag = true;

//     todoArray.filter(function (value) {
//       if (value.task.toLowerCase() === chars.toLowerCase()) {
//         flag = false;
//       }
//     });
//     if (flag === true) {
//       obj = { id: todoArray.length + 1, task: chars };
//     }
//     else {
//       alert("Task Already Exist");
//     }
//   }

//   //Adding new todos 
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     storeInput();
//     if (flag != false) {

//       settodoArray((x) => {
//         return [...x, obj];
//       });
//     }
//     setChars("");
//     setFilterCheck(()=>{
//       return true;
//     });
//   }

//   //Delete Todolist
//   const deleteTaskFunc = (id) => {
//     const removeItem = todoArray.filter((checker) => {
//       return checker.id != id;
//     });
//     for (let k = 0; k < removeItem.length; k++) {
//       removeItem[k].id = k + 1;
//     }
//     settodoArray(removeItem);
//   }

//   //Edit TodoList
//   const editTaskFunc = (dataa) => {
//     setIsShowEditBtn(false);
//     setInd(dataa.id);
//     setChars(dataa.task);
//   }

//   //Update TodoList after editing
//   const updateTask = (e) => {
//     e.preventDefault();
//     if (chars !== "") {
//       // val = chars;
//       todoArray.find((x) => {
//         if (x.id === ind) {
//           x.task = chars;
//         }
//       })
//       settodoArray([...todoArray]);
//       setIsShowEditBtn(true);
//     }
//     setChars("");
//     setFilterCheck(()=>{
//       return true;
//     });
//   }

//   // Filtering Function
//   const filteringFunction = (ele) => {
//     setChars(ele);
//       setChars((x)=>{
//        if(x.length>0){
//          setFilterCheck(()=>{
//           return false;
//          });
//          setFilterArray(todoArray.filter((a)=> a.task.toLowerCase().includes(x)));
//          setFilterArray((y)=>{
//            return y;
//          });
//        }
//       else {
//         setFilterCheck(()=>{
//           return true;
//         });
//       }

//        return x;
//       });
//   }

//   return (
//     <div className='mainDiv'>
//       <div className='todo-form-div'>
//         <h2 className='addNewTaskHeading'>Add New Task</h2>
//         <form onSubmit={isShowEditBtn ? handleSubmit : updateTask} className='todo-form'>
//           <input type="text" id="todo-form-inputField" className='todo-form-input' placeholder='Task Name' required value={chars}
//           onChange={(e)=>{
//             filteringFunction(e.target.value);
//           }}/>

//           {isShowEditBtn ?
//             <button type='submit' id="todo-form-submit">
//               <i className="fa fa-check"></i>
//             </button>
//             :
//             <button type='submit' id='updateListButton'>Update</button>
//           }
//         </form>
//       </div>
//       <div className='todoListDiv'>
//         {
//           filterCheck ? 
//             todoArray.map((data) => {
//               return (
//                 <h2 className='todoListShow' key={data.id}>Task {data.id} : {data.task}
//                   <div className='todoButtons'>
//                     <button className='edit-task-button' onClick={() => editTaskFunc(data)}><i className="fa fa-pencil"></i></button>
//                     <button className='del-task-button' onClick={() => deleteTaskFunc(data.id)}><i className="fa fa-trash"></i></button>
//                   </div>
//                 </h2>
//               );
//             })
//           :
//             filterArray.map((data) => {
//               return (
//                 <h2 className='todoListShow' key={data.id}>Task {data.id} : {data.task}
//                   <div className='todoButtons'>
//                     <button className='edit-task-button' onClick={() => editTaskFunc(data)}><i className="fa fa-pencil"></i></button>
//                     <button className='del-task-button' onClick={() => deleteTaskFunc(data.id)}><i className="fa fa-trash"></i></button>
//                   </div>
//                 </h2>
//               );
//             })
//         }
//       </div>
//     </div>
//   )
// }

// export default Todo;