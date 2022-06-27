// SPDX-License-Identifier: MIT
// *** pragma es para indicar el lenguaje que vamos a usar y la version
pragma solidity ^0.8.6;

contract TasksContracts {

    // *** uint es un entero per sin numeros negativos
    uint public taskCounter = 0;

    // *** CONSTRUCTOR
    constructor () {
        createTask("Mi primer tarea de ejemplo", "Tengo que hacer algo");
    }

    // *** EVENTO
    event TaskCreated(
        uint id,
        string title,
        string description,
        bool done,
        uint createdAt
    );

    event TaskToggleDone (uint id, bool done); 

    event TaskDeleted (uint id);


    // *** struct sirve para crear un nuevo tipo de dato
    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }

    // *** mapping es un conjunto de datos con clave y valor
    // en este caso recive un struc y la lista se va a llamar tasks y va a ser publica
    mapping (uint256 => Task) public tasks;

    // *** para que se guarden  solo por un momento se le añade la palabra memory asi no se guarden
    // en la blockchain, al ponerle _param le dice que el param es privado
    function createTask (string memory _title, string memory _description) public {
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
        // ** emit para emitir un evento
        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }

    function toggleDone (uint _id) public {
       Task memory _task = tasks[_id]; 
       _task.done = !_task.done;
       tasks[_id] = _task;
       emit TaskToggleDone(_id, _task.done);
    }


}