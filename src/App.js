import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { loadContract } from './utils/loadContracts';
import { formatDate } from './utils/convertTimestamp';
import { getAccount, getAllTask, getTask } from './utils/action';
import './App.css';
import Modal from './Modal';

function App() {
  const [api, setApi] = useState({
    provider: null,
    contract: null,
    web3: null,
    account: null
  })
  const [taskArr, setTaskArr] = useState([]);
  const [taskEdit, setTaskEdit] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: false
  });

  useEffect(() => {
    const init = async () => {
      const provider = new Web3.providers.HttpProvider('http://localhost:7545');
      const web3 = new Web3(provider);
      const contract = await loadContract('Todo', provider);
      const account = await getAccount(web3);
      setApi({ ...api, provider, contract, web3, account });
      const arr = await getAllTask(contract);
      setTaskArr([...arr]);
    }
    init();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { contract, account } = api;
    const { content, author } = e.target;
    // khi tạo 1 transaction => luôn có trường from, to
    await contract.createTask(
      content.value,
      author.value,
      { from: account, gas: 1000000 }
    );
    const newTask = await getTask(contract, taskArr.length + 1);
    newTask && setTaskArr([...taskArr, newTask]);
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const { contract, account } = api;
    await contract.editTask(
      taskEdit[0],
      [taskEdit[0], taskEdit[1], e.target[2].value, e.target[3].value, e.target[4].checked],
      { from: account, gas: 1000000 }
    )
    const arr = await getAllTask(contract);
    setTaskArr([...arr]);
  }

  const handleChange = (e) => {
    let {name, value} = e.target;
    if(name === "4"){
      value = e.target.checked;
    }
    setTaskEdit({...taskEdit, [name]: value});
  }
  return (
    <div className="App">
      <div className='container-fluid p-0'>
        <div className='header p-5 bg-info text-center text-white'>
          <h1 className='fw-bold'>ETB Ethereum Todolist App</h1>
          <p className='fw-semibold'>Contract deployed at address: <span className='text-dark'>{api.contract ? api.contract.address : ""}</span></p>
        </div>
        <div className='taskForm container mb-3 mt-5 p-3'>
          <h2>Create Task</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="content" className="form-label fw-semibold">Content</label>
              <input className="form-control" id="content" name='content' required />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label fw-semibold">Author</label>
              <input className="form-control" id="author" name='author' required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className='taskTable p-4'>
          <h2>Tasks</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Content</th>
                <th>Author</th>
                <th>Done</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {taskArr.map(task => {
                return <tr key={task[0].toString()}>
                  <td>{task[0].toString()}</td>
                  <td>{formatDate(task[1].toString())}</td>
                  <td>{task[2]}</td>
                  <td>{task[3]}</td>
                  <td>{task[4].toString()}</td>
                  <td>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => setTaskEdit({ ...task })}><i className="fa-solid fa-pen"></i></button>
                  </td>
                </tr>
              })}
              {/* <input className="form-check-input" type="checkbox" defaultValue /> */}
            </tbody>
          </table>
        </div>
      </div>
      <Modal task={taskEdit} handleEdit={handleEdit} handleChange={handleChange}/>
    </div>
  );
}

export default App;
