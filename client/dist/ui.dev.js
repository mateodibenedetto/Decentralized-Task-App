"use strict";

var d = document;
var $taskForm = d.querySelector("#taskForm");
d.addEventListener("DOMContentLoaded", function () {
  App.init();
});
$taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  App.createTask($taskForm["title"].value, $taskForm["description"].value);
});