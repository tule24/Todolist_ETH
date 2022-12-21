// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Todo {
  // variables
  struct Task {
    uint id;
    uint date;
    string content;
    string author;
    bool done;
  }
  //Task[] tasks; Vì course xài ver cũ ko xài mảng được nên chuyển sang xài mapping
  uint lastTaskId;
  uint[] taskIds;
  mapping(uint => Task) tasks;

// modifier
  modifier checkId(uint id) {
    require(id < lastTaskId && id > 0, "Not found!!!");
    _;
  }  

//event
  event createNewTask(uint indexed id, uint indexed date, string content, string indexed author);

// constructor
constructor(){
  lastTaskId = 1;
}

//functions  
  function createTask(string calldata _content, string calldata _author) public {
    tasks[lastTaskId] = Task(lastTaskId, block.timestamp, _content, _author, false);
    taskIds.push(lastTaskId);
    emit createNewTask(lastTaskId, block.timestamp, _content, _author);
    lastTaskId++;
    //tasks.push(Task(tasks.length, block.timestamp, _content, author, false));
  }

  function getTask(uint id) view public checkId(id) returns(uint, uint, string memory, string memory, bool){
    Task memory result = tasks[id];
    return(id, result.date, result.content, result.author, result.done);
  }

  function getTaskIds() view public returns(uint[] memory){
    return taskIds;
    //return tasks;
  } 

  function getHash(string memory field) pure internal returns (bytes32){
    return keccak256(abi.encode(field));
  }

  function editTask(uint id, Task memory _task) public {
    Task storage task = tasks[id];
    if(getHash(task.content) != getHash(_task.content)){
      task.content = _task.content;
    }
    if(getHash(task.author) != getHash(_task.author)){
      task.author = _task.author;
    }
    if(!(task.done && _task.done)){
      task.done = _task.done;
    }
  } 
}
