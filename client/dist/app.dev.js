"use strict";

App = {
  contracts: {},
  init: function init() {
    return regeneratorRuntime.async(function init$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(App.loadEthereum());

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(App.loadAccount());

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(App.loadContracts());

          case 6:
            App.render();
            _context.next = 9;
            return regeneratorRuntime.awrap(App.renderTasks());

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  loadEthereum: function loadEthereum() {
    return regeneratorRuntime.async(function loadEthereum$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!window.ethereum) {
              _context2.next = 6;
              break;
            }

            App.web3provider = window.ethereum; // si existe la wallet la vamos a guardar en una propiedad

            _context2.next = 4;
            return regeneratorRuntime.awrap(window.ethereum.request({
              method: 'eth_requestAccounts'
            }));

          case 4:
            _context2.next = 7;
            break;

          case 6:
            if (window.web3) {
              web3 = new Web3(window.web3.currentProvider);
            } else {
              console.log('No Ethereum browser');
            }

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  loadAccount: function loadAccount() {
    var accounts;
    return regeneratorRuntime.async(function loadAccount$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(window.ethereum.request({
              method: 'eth_requestAccounts'
            }));

          case 2:
            accounts = _context3.sent;
            App.account = accounts[0];

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  loadContracts: function loadContracts() {
    var res, tasksContractJSON;
    return regeneratorRuntime.async(function loadContracts$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(fetch("TasksContracts.json"));

          case 2:
            res = _context4.sent;
            _context4.next = 5;
            return regeneratorRuntime.awrap(res.json());

          case 5:
            tasksContractJSON = _context4.sent;
            App.contracts.tasksContract = TruffleContract(tasksContractJSON);
            App.contracts.tasksContract.setProvider(App.web3provider);
            _context4.next = 10;
            return regeneratorRuntime.awrap(App.contracts.tasksContract.deployed());

          case 10:
            App.tasksContract = _context4.sent;

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  render: function render() {
    document.getElementById('account').innerText = App.account; // inserta el numero de la cuenta de metamask
  },
  renderTasks: function renderTasks() {
    var taskCounter, taskCounterNumber, html, i, task, taskId, taskTitle, taskDescription, taskDone, taskCreated, taskElement;
    return regeneratorRuntime.async(function renderTasks$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(App.tasksContract.taskCounter());

          case 2:
            taskCounter = _context5.sent;
            taskCounterNumber = taskCounter.toNumber();
            html = '';
            i = 1;

          case 6:
            if (!(i <= taskCounterNumber)) {
              _context5.next = 20;
              break;
            }

            _context5.next = 9;
            return regeneratorRuntime.awrap(App.tasksContract.tasks(i));

          case 9:
            task = _context5.sent;
            taskId = task[0];
            taskTitle = task[1];
            taskDescription = task[2];
            taskDone = task[3];
            taskCreated = task[4];
            taskElement = "\n                <div class=\"card bg-dark mb-2\">\n                    <div class=\"card-header d-flex justify-content-between align-items-center\">\n                        <span>".concat(taskTitle, "</span> \n                        <div class=\"form-check form-switch\">\n                            <input \n                                class=\"form-check-input\" \n                                data-id=\"").concat(taskId, "\" \n                                type=\"checkbox\" \n                                ").concat(taskDone && "checked", " \n                                onchange=\"App.toggleDone(this)\" \n                            /> \n                        </div>\n                    </div>\n                    <div class=\"card-body\">\n                        <span>").concat(taskDescription, "</span>\n                        <p class=\"text-muted mt-2 mb-0\">Task was created ").concat(new Date(taskCreated * 1000).toLocaleString(), "</p>\n                    </div>\n                </div>\n            ");
            html += taskElement;

          case 17:
            i++;
            _context5.next = 6;
            break;

          case 20:
            document.querySelector("#taskList").innerHTML = html;

          case 21:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  createTask: function createTask(title, description) {
    var result;
    return regeneratorRuntime.async(function createTask$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(App.tasksContract.createTask(title, description, {
              from: App.account
            }));

          case 2:
            result = _context6.sent;

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  toggleDone: function toggleDone(element) {
    var taskId;
    return regeneratorRuntime.async(function toggleDone$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            taskId = element.dataset.id;
            _context7.next = 3;
            return regeneratorRuntime.awrap(App.tasksContract.toggleDone(taskId, {
              from: App.account
            }));

          case 3:
            window.location.reload();

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    });
  }
};