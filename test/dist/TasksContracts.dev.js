"use strict";

var _this = void 0;

// *** TESTING con mocha *** //
var TasksContracts = artifacts.require("TasksContracts");

contract("TasksContracts", function () {
  before(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(TasksContracts.deployed());

          case 2:
            _this.tasksContract = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  it("migrate deployed successfully", function _callee2() {
    var address;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            address = _this.tasksContract.address;
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
            assert.notEqual(address, 0x0);
            assert.notEqual(address, "");

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  it("get Task List", function _callee3() {
    var tasksCounter, task;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_this.tasksContract.taskCounter());

          case 2:
            tasksCounter = _context3.sent;
            _context3.next = 5;
            return regeneratorRuntime.awrap(_this.tasksContract.tasks(tasksCounter));

          case 5:
            task = _context3.sent;
            assert.equal(task.id.toNumber(), tasksCounter);
            assert.equal(task.title, "Mi primer tarea de ejemplo");
            assert.equal(task.description, "Tengo que hacer algo");
            assert.equal(task.done, false);
            assert.equal(tasksCounter, 1);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it("task created successfully", function _callee4() {
    var result, taskEvent, tasksCounter;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_this.tasksContract.createTask("some task", "description 2"));

          case 2:
            result = _context4.sent;
            taskEvent = result.logs[0].args;
            _context4.next = 6;
            return regeneratorRuntime.awrap(_this.tasksContract.taskCounter());

          case 6:
            tasksCounter = _context4.sent;
            assert.equal(tasksCounter, 2);
            assert.equal(taskEvent.id.toNumber(), 2);
            assert.equal(taskEvent.title, "some task");
            assert.equal(taskEvent.description, "description 2");
            assert.equal(taskEvent.done, false);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  it("task toogle done", function _callee5() {
    var result, taskEvent, task;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(_this.tasksContract.toggleDone(1));

          case 2:
            result = _context5.sent;
            taskEvent = result.logs[0].args;
            _context5.next = 6;
            return regeneratorRuntime.awrap(_this.tasksContract.tasks(1));

          case 6:
            task = _context5.sent;
            assert.equal(task.done, true);
            assert.equal(taskEvent.done, true);
            assert.equal(taskEvent.id, 1);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
});